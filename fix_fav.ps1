$file = 'E:\Online-Shopping-System\visual\js\products.js'
$content = Get-Content $file -Raw

$old = 'class="btn btn-favourite flex-grow-1"><i class="bi bi-heart"></i><span style="font-size: 1rem;font-weight: 700;margin-left: 5px"> Add to favourites</span></button>'
$new = 'class="btn btn-favourite flex-grow-1" id="pd-fav-btn"><i class="bi bi-heart" id="pd-fav-icon"></i><span id="pd-fav-label" style="font-size:1rem;font-weight:700;margin-left:5px"> Add to Favourites</span></button>'

$patched = $content.Replace($old, $new)

if ($patched -eq $content) {
    Write-Host "WARNING: Pattern not found — no replacement made."
} else {
    Set-Content $file $patched -NoNewline
    Write-Host "SUCCESS: Favourite button patched."
}
