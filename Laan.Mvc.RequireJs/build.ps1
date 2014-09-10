param([switch]$minify)

cls
$scriptBuilt = "Scripts-Built"

if ((Test-Path $scriptBuilt))
{
    Remove-Item $scriptBuilt -Recurse -Force
}

pushd .\Scripts

$configCopy = "./Scripts/App/app-main.js"
$optimize = if($minify.IsPresent) { "uglify" } else { "none" }

$js = @"
({
    baseUrl: "./Scripts",
    optimize: "$optimize",
    optimizeCss: "none",
    skipDirOptimize: true,
    removeCombined: true,
    dir: "./Scripts-Built",

    paths: {
        "jquery": "Libs/jquery/jquery-1.7.1.min",
        "jquery-ui": "Libs/jquery/jquery-ui-1.8.20.min",
        "underscore": "Libs/Underscore/underscore.min",
        "moment": "Libs/moment/moment.min",
        "knockout": "Libs/knockout/knockout-3.0.0",
        "ko-mapping": "Libs/knockout/knockout.mapping",

        // common libs only - don't add everything.. just the well-used libs
        "logging": "App/_Utils/logging",
        "http": "App/_Utils/http",
        "binding": "App/_Utils/binding",
        "string": "App/_Utils/string",
        "entity": "App/_Utils/entity",
        "widget": "App/_Utils/widget"
    },

    shim: {
        "underscore": {
            exports: "_"
        }
    },

    modules: [
"@

$index = 0
ls .\App\*.js -Recurse | % { 

    $path = $_.DirectoryName.Replace($pwd.Path + "\", "")
    $name = "$path\$($_.Name)".Replace(".js", "").Replace("\", "/")

    if (!$name.StartsWith("Common")) {

        $comma = if($index -gt 0) { ',' }

        $js += @"
        $comma{
            name: "$name",
            exclude: ["underscore", "jquery", "jquery-ui", "knockout", "moment"]
        }

"@
        $index++
    }
}

$js += @"
    ]
})
"@

popd

$js
Remove-Item .\app.build.js -Force
sc -Value $js -Path .\app.build.js -Force

node .\Scripts\Libs\require\r.js -o app.build.js