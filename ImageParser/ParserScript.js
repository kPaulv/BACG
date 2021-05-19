function al() {
    let width = document.body.clientWidth;
    alert(width);
}

window.onload = function () {
    let photo_input = document.getElementById('myFile');

    photo_input.onchange = function () {
        let reader = new FileReader();

        reader.readAsDataURL(this.files[0])
        document.getElementById("fileName").innerHTML = photo_input.files.item(0).name;
        document.getElementById("fileSize").innerHTML = Math.round(photo_input.files.item(0).size / 1024) + " КБ";

        let file = photo_input.files.item(0).name;
        file = file.replace('+', '');
        const pixelSizesRegex = /\d+х\d+х\d+/;

        const pixelSizesStr = file.match(pixelSizesRegex)[0];
        console.log(pixelSizesStr);
        const pixelSizes = pixelSizesStr.split('х');

        const pixelSize = pixelSizes[0] + 'х' + pixelSizes[1];
        const resolution = pixelSizes[2];

        const colorDepth = Math.round(8 * photo_input.files.item(0).size / parseInt(pixelSizes[0]) / parseInt(pixelSizes[1]));
        const compression = file.replace(pixelSizesStr, '').split('.')[0];
        const type = file.replace(pixelSizesStr, '').split('.')[1];

        document.getElementById("size").innerHTML = pixelSize;
        document.getElementById("resolution").innerHTML = resolution;
        document.getElementById("colorDepth").innerHTML = colorDepth.toString();
        document.getElementById("compression").innerHTML = compression;
        document.getElementById("type").innerHTML = type;
    }
}