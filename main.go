package main

import (
	"context"
	"embed"

	"github.com/davecgh/go-spew/spew"
	"github.com/google/go-github/v45/github"
	"github.com/spf13/viper"
	"github.com/wailsapp/wails/v2"
	"github.com/wailsapp/wails/v2/pkg/options"
	"golang.org/x/oauth2"

	"github.com/bakkerme/github-pr-manager/githubservice"
)

//go:embed frontend/dist
var assets embed.FS

func loadEnvConfig() {
	viper.SetConfigFile(".env")
	viper.ReadInConfig() // Find and read the config file

	viper.SetConfigFile(".env.local")
	viper.SetConfigType("env")
	viper.MergeInConfig()
}

func loadFileConfig() {
	viper.SetConfigFile("%USERPROFILE%\\AppData\\Local\\GithubPRManager\\config")
	viper.SetConfigType("env")
	viper.SetConfigFile("/home/brandon/.config/github-pr-manager/config")
	viper.SetConfigType("env")
	viper.ReadInConfig()
}

func loadConfig() config {
	loadEnvConfig()
	loadFileConfig()

	var orgFilter *string
	if viper.IsSet("ORG_FILTER") {
		value := viper.GetString("ORG_FILTER")
		if value != "" {
			orgFilter = &value
		}
	}

	if !viper.IsSet("GITHUB_USERNAME") || viper.GetString("GITHUB_USERNAME") == "" {
		panic("GITHUB_USERNAME is not set")
	}

	if !viper.IsSet("GITHUB_ACCESS_TOKEN") || viper.GetString("GITHUB_ACCESS_TOKEN") == "" {
		panic("GITHUB_ACCESS_TOKEN is not set")
	}

	return config{
		GithubUsername:    viper.GetString("GITHUB_USERNAME"),
		GithubAccessToken: viper.GetString("GITHUB_ACCESS_TOKEN"),
		Frameless:         viper.GetBool("FRAMELESS"),
		OrgFilter:         orgFilter,
	}
}

func main() {
	ctx := context.Background()

	cfg := loadConfig()
	spew.Dump(cfg)

	ts := oauth2.StaticTokenSource(
		&oauth2.Token{AccessToken: cfg.GithubAccessToken},
	)
	tc := oauth2.NewClient(ctx, ts)
	client := github.NewClient(tc)

	gh := githubservice.New(ctx, client)

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
		Frameless:        cfg.Frameless,
		Bind: []interface{}{
			app,
		},
	})

	if err != nil {
		println("Error:", err.Error())
	}
}
