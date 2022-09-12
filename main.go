package main

import (
	"context"
	"embed"

	hfutils "github.com/bakkerme/hyperfocus-utils"
	"github.com/google/go-github/v45/github"
	"github.com/wailsapp/wails/v2"
	"github.com/wailsapp/wails/v2/pkg/options"
	"golang.org/x/oauth2"

	"github.com/bakkerme/github-pr-manager/githubservice"
)

//go:embed frontend/dist
var assets embed.FS

func main() {
	ctx := context.Background()

	envRead := hfutils.EnvRead{}
	token, found := envRead.LookupEnv("GITHUB_ACCESS_TOKEN")
	username, found := envRead.LookupEnv("GITHUB_USERNAME")

	if !found {
		panic("Could not load GITHUB_ACCESS_TOKEN from env")
	}

	ts := oauth2.StaticTokenSource(
		&oauth2.Token{AccessToken: token},
	)
	tc := oauth2.NewClient(ctx, ts)
	client := github.NewClient(tc)

	gh := githubservice.New(ctx, client)

	cfg := config{
		GithubUsername: username,
	}

	// Create an instance of the app structure
	app := NewApp(gh, cfg)

	// Create application with options
	err := wails.Run(&options.App{
		Title:            "github-pr-manager",
		Width:            1024,
		Height:           1200,
		Assets:           assets,
		BackgroundColour: &options.RGBA{R: 27, G: 38, B: 54, A: 255},
		OnStartup:        app.startup,
		// Frameless:        true,
		Bind: []interface{}{
			app,
		},
	})

	if err != nil {
		println("Error:", err.Error())
	}
}
