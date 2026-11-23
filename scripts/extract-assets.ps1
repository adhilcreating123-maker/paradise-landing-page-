Add-Type -AssemblyName System.Drawing
function Save-Crop($source,$name,$x,$y,$w,$h) {
 $im=[System.Drawing.Bitmap]::FromFile((Resolve-Path $source)); $rect=New-Object System.Drawing.Rectangle($x,$y,$w,$h); $crop=$im.Clone($rect,$im.PixelFormat); $crop.Save((Join-Path (Resolve-Path 'public/images') "$name.jpg"),[System.Drawing.Imaging.ImageFormat]::Jpeg); $crop.Dispose(); $im.Dispose()
}
$landingRef='stitch_paradise_bakes_website_clone/paradise_bakes_landing_page_with_cake_world_section/screen.png'
$cake='stitch_paradise_bakes_website_clone/paradise_bakes_glass_vitrine_cake_showcase_custom_builder/screen.png'
Save-Crop $landingRef 'logo' 43 67 65 65
Save-Crop $landingRef 'hero' 960 146 640 760
Save-Crop $cake 'red-velvet' 147 681 200 110
Save-Crop $cake 'chocolate' 516 681 200 110
Save-Crop $cake 'berry' 885 681 200 110
Save-Crop $cake 'caramel' 1254 681 200 110

