param([switch]$minify)

cls
$scriptBuilt = "Scripts-Built"

if ((Test-Path $scriptBuilt))
{
    Remove-Item $scriptBuilt -Recurse -Force
}

pushd .\Scripts

$configCopy = "./Scripts/bootstrapper.js"
$optimize = if($minify.IsPresent) { "all" } else { "none" }

$js = @"
({
    baseUrl: "./Scripts",
    optimize: "$optimize",
    mainConfigFile: '$configCopy',
    dir: "./Scripts-Built",
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
            include: ["./$name"],
            exclude: ["underscore", "jquery", "knockout"]
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