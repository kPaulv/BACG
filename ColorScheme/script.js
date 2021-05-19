function rgbToHex(r, g, b) {
    return ((1 << 24) + (r << 16) + (g << 8) + b).toString(16).slice(1);
}

const div = document.querySelector('#BigRectangle');
const curs = document.querySelector('#colorPickerCursor');
window.addEventListener('mousedown', (ev) => {
    const rect = div.getBoundingClientRect();
    if ((ev.clientX - rect.left) >= 0 && (ev.clientX - rect.left) <= 210 && (ev.clientY - rect.top) >= 0 && (ev.clientY - rect.top) <= 210) {
        curs.setAttribute("cx", ev.clientX - rect.left);
        curs.setAttribute("cy", ev.clientY - rect.top);

        if ((ev.clientY - rect.top) > 100) {
            curs.setAttribute("stroke", "white");
        } else {
            curs.setAttribute("stroke", "black");
        }

        let s = (ev.clientX - rect.left) / 210;
        let v = 1 - (ev.clientY - rect.top) / 210;
        let h = document.getElementById("li_H").value;
        let l = (2 - s) * v / 2;
        let ss;
        if (l !== 0) {
            if (l == 1) {
                ss = 0
            } else if (l < 0.5) {
                ss = s * v / (l * 2)
            } else {
                ss = s * v / (2 - l * 2)
            }
        }
        this.s = ss;
        this.h = h;
        this.l = l;

        document.getElementById("li_H").value = Math.trunc(this.h);
        document.getElementById("li_S").value = Math.trunc(this.s * 100);
        document.getElementById("li_L").value = Math.trunc(this.l * 100);
        let c;
        c = v * s;
        let x;
        x = c * (1 - Math.abs((h / 60) % 2 - 1));
        let m;
        m = v - c;
        let rr, gg, bb;
        if (h >= 0 && h < 60) {
            rr = c;
            gg = x;
            bb = 0;
        }
        if (h >= 60 && h < 120) {
            rr = x;
            gg = c;
            bb = 0;
        }

        if (h >= 120 && h < 180) {
            rr = 0;
            gg = c;
            bb = x;
        }

        if (h >= 180 && h < 240) {
            rr = 0;
            gg = x;
            bb = c;
        }
        if (h >= 240 && h < 300) {
            rr = x;
            gg = 0;
            bb = c;
        }
        if (h >= 300 && h < 360) {
            rr = c;
            gg = 0;
            bb = x;
        }

        this.r = (rr + m) * 255;
        this.g = (gg + m) * 255;
        this.b = (bb + m) * 255;


        document.getElementById("ResultRectangle").style.background = `rgb(${this.r},${this.g},${this.b})`;

        document.getElementById("li_R").value = Math.trunc(this.r);
        document.getElementById("li_B").value = Math.trunc(this.b);
        document.getElementById("li_G").value = Math.trunc(this.g);
        document.getElementById("input_Hex").value = rgbToHex(Math.trunc(this.r), Math.trunc(this.g), Math.trunc(this.b));
        let result = new CMYK(0, 0, 0, 0);

        result.k = Math.min(1 - this.r / 255, 1 - this.g / 255, 1 - this.b / 255);
        result.c = (1 - this.r / 255 - result.k) / (1 - result.k);
        result.m = (1 - this.g / 255 - result.k) / (1 - result.k);
        result.y = (1 - this.b / 255 - result.k) / (1 - result.k);

        result.c = Math.round(result.c * 100);
        result.m = Math.round(result.m * 100);
        result.y = Math.round(result.y * 100);
        result.k = Math.round(result.k * 100);

        document.getElementById("li_C").value = result.c;
        document.getElementById("li_M").value = result.m;
        document.getElementById("li_Y").value = result.y;
        document.getElementById("li_K").value = result.k;
    }
}, {
    capture: true
})

function hlstorgb(h, l, s) {
    h = h / 360;
    s = s / 100;
    l = l / 100;

    let r = l;
    let g = l;
    let b = l;
    let v = (l <= 0.5) ? (l * (1.0 + s)) : (l + s - l * s);

    if (v > 0) {

        let m;
        let sv;
        let sextant;
        let fract;
        let vsf;
        let mid1;
        let mid2;

        m = l + l - v;
        sv = (v - m) / v;
        h = h * 6.0;
        sextant = Math.floor(h);
        fract = h - sextant;
        vsf = v * sv * fract;
        mid1 = m + vsf;
        mid2 = v - vsf;

        switch (sextant) {

            case 0:
                r = v;
                g = mid1;
                b = m;
                break;

            case 1:
                r = mid2;
                g = v;
                b = m;
                break;

            case 2:
                r = m;
                g = v;
                b = mid1;
                break;

            case 3:
                r = m;
                g = mid2;
                b = v;
                break;

            case 4:
                r = mid1;
                g = m;
                b = v;
                break;

            case 5:
                r = v;
                g = m;
                b = mid2;
                break;
        }
    }
    this.r = r * 255;
    this.g = g * 255;
    this.b = b * 255;

    let k = Math.min(1 - r, 1 - g, 1 - b);
    let c = (1 - r - k) / (1 - k);
    let mm = (1 - g - k) / (1 - k);
    let y = (1 - b - k) / (1 - k);

    c = Math.round(c * 100);
    mm = Math.round(mm * 100);
    y = Math.round(y * 100);
    k = Math.round(k * 100);

    document.getElementById("li_C").value = c;
    document.getElementById("li_M").value = mm;
    document.getElementById("li_Y").value = y;
    document.getElementById("li_K").value = k;
    document.getElementById("li_R").value = parseInt(this.r);
    document.getElementById("li_G").value = parseInt(this.g);
    document.getElementById("li_B").value = parseInt(this.b);
    document.getElementById("input_Hex").value = rgbToHex(Math.trunc(this.r), Math.trunc(this.g), Math.trunc(this.b));
    return [`rgb(${this.r},${this.g},${this.b})`];
}

function Volume() {
    document.getElementById("li_H").value = document.getElementById("volume").value;
    document.getElementById("color-picker-tone").style.fill = hlstorgb(document.getElementById("li_H").value, 50, 100);
    document.getElementById("ResultRectangle").style.background = hlstorgb(document.getElementById("li_H").value,
        document.getElementById("li_L").value, document.getElementById("li_S").value);
}

function CMYK(c, m, y, k) {
    this.c = c;
    this.m = m;
    this.y = y;
    this.k = k;
}

function HLStoColorPickerTone(h, l, s) {

    h = h / 360;
    s = s / 100;
    l = l / 100;
    let r = l;
    let g = l;
    let b = l;
    let v = (l <= 0.5) ? (l * (1.0 + s)) : (l + s - l * s);

    if (v > 0) {

        let m;
        let sv;
        let sextant;
        let fract;
        let vsf;
        let mid1;
        let mid2;

        m = l + l - v;
        sv = (v - m) / v;
        h = h * 6.0;
        sextant = Math.floor(h);
        fract = h - sextant;
        vsf = v * sv * fract;
        mid1 = m + vsf;
        mid2 = v - vsf;

        switch (sextant) {

            case 0:
                r = v;
                g = mid1;
                b = m;
                break;

            case 1:
                r = mid2;
                g = v;
                b = m;
                break;

            case 2:
                r = m;
                g = v;
                b = mid1;
                break;

            case 3:
                r = m;
                g = mid2;
                b = v;
                break;

            case 4:
                r = mid1;
                g = m;
                b = v;
                break;

            case 5:
                r = v;
                g = m;
                b = mid2;
                break;
        }
    }
    this.r = r * 255;
    this.g = g * 255;
    this.b = b * 255;
    document.getElementById("color-picker-tone").style.fill = `rgb(${this.r},${this.g},${this.b})`;
}


function RGBtoCMYK() {


    let r = document.getElementById("li_R").value;
    let b = document.getElementById("li_B").value;
    let g = document.getElementById("li_G").value;


    if ((r > 255) || (g > 255) || (b > 255) || (r < 0) || (g < 0) || (b < 0)) {
        r = 255;
        alert("Вы ввели недопустимое значение!После нажатия 'OK' будут значения красного цвета.")
        document.getElementById("li_R").value = 255;
        document.getElementById("li_B").value = 0;
        document.getElementById("li_G").value = 0;
        g = 0;
        b = 0;
    }


    let result = new CMYK(0, 0, 0, 0);

    result.k = Math.min(1 - r / 255, 1 - g / 255, 1 - b / 255);
    result.c = (1 - r / 255 - result.k) / (1 - result.k);
    result.m = (1 - g / 255 - result.k) / (1 - result.k);
    result.y = (1 - b / 255 - result.k) / (1 - result.k);

    result.c = Math.round(result.c * 100);
    result.m = Math.round(result.m * 100);
    result.y = Math.round(result.y * 100);
    result.k = Math.round(result.k * 100);

    document.getElementById("li_C").value = result.c;
    document.getElementById("li_M").value = result.m;
    document.getElementById("li_Y").value = result.y;
    document.getElementById("li_K").value = result.k;
    this.r = r;
    this.g = g;
    this.b = b;
    document.getElementById("input_Hex").value = rgbToHex(Math.trunc(this.r), Math.trunc(this.g), Math.trunc(this.b));
    document.getElementById("ResultRectangle").style.background = `rgb(${this.r},${this.g},${this.b})`;

}


function RGBToHSL() {

    let r = document.getElementById("li_R").value;
    let b = document.getElementById("li_B").value;
    let g = document.getElementById("li_G").value;
    if ((r > 255) || (g > 255) || (b > 255) || (r < 0) || (g < 0) || (b < 0)) {
        r = 255;
        alert("Вы ввели недопустимое значение!После нажатия 'OK' будут значения красного цвета.")
        document.getElementById("li_R").value = 255;
        document.getElementById("li_B").value = 0;
        document.getElementById("li_G").value = 0;
        g = 0;
        b = 0;
    }

    // Make r, g, and b fractions of 1
    r /= 255;
    g /= 255;
    b /= 255;

    // Find greatest and smallest channel values
    let cmin = Math.min(r, g, b),
        cmax = Math.max(r, g, b),
        delta = cmax - cmin,
        h = 0,
        s = 0,
        l = 0;


    // Calculate hue
    // No difference
    if (delta == 0)
        h = 0;
    // Red is max
    else if (cmax == r)
        h = ((g - b) / delta) % 6;
    // Green is max
    else if (cmax == g)
        h = (b - r) / delta + 2;
    // Blue is max
    else
        h = (r - g) / delta + 4;

    h = Math.round(h * 60);

    // Make negative hues positive behind 360°
    if (h < 0)
        h += 360;


    // Calculate lightness
    l = (cmax + cmin) / 2;

    // Calculate saturation
    s = delta == 0 ? 0 : delta / (1 - Math.abs(2 * l - 1));

    // Multiply l and s by 100
    s = +(s * 100).toFixed(1);
    l = +(l * 100).toFixed(1);


    if (document.getElementById("li_H").value !== h) {
        document.getElementById("color-picker-tone").style.fill = `rgb(${this.r},${this.g},${this.b})`;
    }

    const divv = document.querySelector('#BigRectangle');
    const curss = document.querySelector('#colorPickerCursor');
    const rectt = divv.getBoundingClientRect();
    let vv = l / 100 + s / 100 * Math.min(l / 100, 1 - l / 100);
    let ss = 0;
    if (vv !== 0) {
        ss = 2 - 2 * l / (100 * vv);
    }

    curss.setAttribute("cx", ss * 210);
    curss.setAttribute("cy", (1 - vv) * 210);

    if (((1 - vv) * 200) > 100) {
        curss.setAttribute("stroke", "white");
    } else {
        curss.setAttribute("stroke", "black");
    }
    HLStoColorPickerTone(h, 50, 100);
    document.getElementById("li_H").value = Math.round(h);
    document.getElementById("li_L").value = Math.round(l);
    document.getElementById("li_S").value = Math.round(s);
    document.getElementById("volume").value = h;

}

function CMYKtoRGB() {
    let c = document.getElementById("li_C").value;
    let m = document.getElementById("li_M").value;
    let y = document.getElementById("li_Y").value;
    let k = document.getElementById("li_K").value;

    if ((c > 100) || (m > 100) || (y > 100) || (k > 100) || (c
        < 0) || (m < 0) || (y < 0) || (k < 0)) {

        alert("Вы ввели недопустимое значение!После нажатия 'OK' будут значения красного цвета.")
        document.getElementById("li_C").value = 0;
        document.getElementById("li_M").value = 100;
        document.getElementById("li_Y").value = 100;
        document.getElementById("li_K").value = 0;
        c = 0;
        m = 100;
        y = 100;
        k = 0;
    }
    c = c / 100;
    m = m / 100;
    y = y / 100;
    k = k / 100;

    let r = 1 - Math.min(1, c * (1 - k) + k);
    let g = 1 - Math.min(1, m * (1 - k) + k);
    let b = 1 - Math.min(1, y * (1 - k) + k);

    r = Math.round(r * 255);
    g = Math.round(g * 255);
    b = Math.round(b * 255);
    document.getElementById("li_R").value = r;
    document.getElementById("li_G").value = g;
    document.getElementById("li_B").value = b;

    this.r = r;
    this.g = g;
    this.b = b;
    document.getElementById("input_Hex").value = rgbToHex(Math.trunc(this.r), Math.trunc(this.g), Math.trunc(this.b));
    document.getElementById("ResultRectangle").style.background = `rgb(${this.r},${this.g},${this.b})`;

}


function CMYKtoHLS() {
    let c = document.getElementById("li_C").value;
    let m = document.getElementById("li_M").value;
    let y = document.getElementById("li_Y").value;
    let k = document.getElementById("li_K").value;

    if ((c > 100) || (m > 100) || (y > 100) || (k > 100) || (c
        < 0) || (m < 0) || (y < 0) || (k < 0)) {
        alert("Вы ввели недопустимое значение!После нажатия 'OK' будут значения красного цвета.")
        document.getElementById("li_C").value = 0;
        document.getElementById("li_M").value = 100;
        document.getElementById("li_Y").value = 100;
        document.getElementById("li_K").value = 0;
        c = 0;
        m = 100;
        y = 100;
        k = 0;
    }

    c = c / 100;
    m = m / 100;
    y = y / 100;
    k = k / 100;

    let r = 1 - Math.min(1, c * (1 - k) + k);
    let g = 1 - Math.min(1, m * (1 - k) + k);
    let b = 1 - Math.min(1, y * (1 - k) + k);

    r = Math.round(r * 255);
    g = Math.round(g * 255);
    b = Math.round(b * 255);
    this.r = r;
    this.g = g;
    this.b = b;

    r /= 255;
    g /= 255;
    b /= 255;

    // Find greatest and smallest channel values
    let cmin = Math.min(r, g, b),
        cmax = Math.max(r, g, b),
        delta = cmax - cmin,
        h = 0,
        s = 0,
        l = 0;


    // Calculate hue
    // No difference
    if (delta == 0)
        h = 0;
    // Red is max
    else if (cmax == r)
        h = ((g - b) / delta) % 6;
    // Green is max
    else if (cmax == g)
        h = (b - r) / delta + 2;
    // Blue is max
    else
        h = (r - g) / delta + 4;

    h = Math.round(h * 60);

    // Make negative hues positive behind 360°
    if (h < 0)
        h += 360;


    // Calculate lightness
    l = (cmax + cmin) / 2;

    // Calculate saturation
    s = delta == 0 ? 0 : delta / (1 - Math.abs(2 * l - 1));

    // Multiply l and s by 100
    s = +(s * 100).toFixed(1);
    l = +(l * 100).toFixed(1);


    const divv = document.querySelector('#BigRectangle');
    const curss = document.querySelector('#colorPickerCursor');
    const rectt = divv.getBoundingClientRect();
    let vv = l / 100 + s / 100 * Math.min(l / 100, 1 - l / 100);
    let ss = 0;
    if (vv !== 0) {
        ss = 2 - 2 * l / (100 * vv);
    }

    curss.setAttribute("cx", ss * 210);
    curss.setAttribute("cy", (1 - vv) * 210);
    if (((1 - vv) * 200) > 100) {
        curss.setAttribute("stroke", "white");
    } else {
        curss.setAttribute("stroke", "black");
    }


    HLStoColorPickerTone(h, 50, 100);
    document.getElementById("li_H").value = h;
    document.getElementById("li_L").value = l;
    document.getElementById("li_S").value = s;
    document.getElementById("volume").value = h;
}

function HLStoRGB() {
    let h = document.getElementById("li_H").value;
    let l = document.getElementById("li_L").value;
    let s = document.getElementById("li_S").value;

    if ((h > 360) || (l > 100) || (s > 100) || (h
        < 0) || (l < 0) || (s < 0)) {

        alert("Вы ввели недопустимое значение!После нажатия 'OK' будут значения красного цвета.")
        document.getElementById("li_H").value = 0;
        document.getElementById("li_L").value = 50;
        document.getElementById("li_S").value = 100;

        h = 0;
        l = 50;
        s = 100;
    }

    document.getElementById("volume").value = h;
    HLStoColorPickerTone(h, 50, 100);
    h = h / 360;
    s = s / 100;
    l = l / 100;
    let r = l;
    let g = l;
    let b = l;
    let v = (l <= 0.5) ? (l * (1.0 + s)) : (l + s - l * s);

    if (v > 0) {

        let m;
        let sv;
        let sextant;
        let fract;
        let vsf;
        let mid1;
        let mid2;

        m = l + l - v;
        sv = (v - m) / v;
        h = h * 6.0;
        sextant = Math.floor(h);
        fract = h - sextant;
        vsf = v * sv * fract;
        mid1 = m + vsf;
        mid2 = v - vsf;

        switch (sextant) {

            case 0:
                r = v;
                g = mid1;
                b = m;
                break;

            case 1:
                r = mid2;
                g = v;
                b = m;
                break;

            case 2:
                r = m;
                g = v;
                b = mid1;
                break;

            case 3:
                r = m;
                g = mid2;
                b = v;
                break;

            case 4:
                r = mid1;
                g = m;
                b = v;
                break;

            case 5:
                r = v;
                g = m;
                b = mid2;
                break;
        }
    }

    document.getElementById("li_R").value = parseInt(r * 255.0);
    document.getElementById("li_G").value = parseInt(g * 255.0);
    document.getElementById("li_B").value = parseInt(b * 255.0);
    this.r = r * 255;
    this.g = g * 255;
    this.b = b * 255;
    document.getElementById("input_Hex").value = rgbToHex(Math.trunc(this.r), Math.trunc(this.g), Math.trunc(this.b));
    document.getElementById("ResultRectangle").style.background = `rgb(${this.r},${this.g},${this.b})`;


}

function HLStoCMYK() {
    let h = document.getElementById("li_H").value;
    let l = document.getElementById("li_L").value;
    let s = document.getElementById("li_S").value;

    if ((h > 360) || (l > 100) || (s > 100) || (h
        < 0) || (l < 0) || (s < 0)) {

        alert("Вы ввели недопустимое значение!После нажатия 'OK' будут значения красного цвета.")
        document.getElementById("li_H").value = 0;
        document.getElementById("li_L").value = 50;
        document.getElementById("li_S").value = 100;

        h = 0;
        l = 50;
        s = 100;
    }

    const divv = document.querySelector('#BigRectangle');
    const curss = document.querySelector('#colorPickerCursor');
    const rectt = divv.getBoundingClientRect();
    let vv = l / 100 + s / 100 * Math.min(l / 100, 1 - l / 100);
    let ss = 0;
    if (vv !== 0) {
        ss = 2 - 2 * l / (100 * vv);
    }

    curss.setAttribute("cx", ss * 210);
    curss.setAttribute("cy", (1 - vv) * 210);
    if (((1 - vv) * 200) > 100) {
        curss.setAttribute("stroke", "white");
    } else {
        curss.setAttribute("stroke", "black");
    }

    h = h / 360;
    s = s / 100;
    l = l / 100;

    let r = l;
    let g = l;
    let b = l;
    let v = (l <= 0.5) ? (l * (1.0 + s)) : (l + s - l * s);

    if (v > 0) {

        let m;
        let sv;
        let sextant;
        let fract;
        let vsf;
        let mid1;
        let mid2;

        m = l + l - v;
        sv = (v - m) / v;
        h = h * 6.0;
        sextant = Math.floor(h);
        fract = h - sextant;
        vsf = v * sv * fract;
        mid1 = m + vsf;
        mid2 = v - vsf;

        switch (sextant) {

            case 0:
                r = v;
                g = mid1;
                b = m;
                break;

            case 1:
                r = mid2;
                g = v;
                b = m;
                break;

            case 2:
                r = m;
                g = v;
                b = mid1;
                break;

            case 3:
                r = m;
                g = mid2;
                b = v;
                break;

            case 4:
                r = mid1;
                g = m;
                b = v;
                break;

            case 5:
                r = v;
                g = m;
                b = mid2;
                break;
        }
    }

    r = parseInt(r * 255.0);
    g = parseInt(g * 255.0);
    b = parseInt(b * 255.0);

    let k = Math.min(1 - r / 255, 1 - g / 255, 1 - b / 255);
    let c = (1 - r / 255 - k) / (1 - k);
    let m = (1 - g / 255 - k) / (1 - k);
    let y = (1 - b / 255 - k) / (1 - k);

    c = Math.round(c * 100);
    m = Math.round(m * 100);
    y = Math.round(y * 100);
    k = Math.round(k * 100);

    document.getElementById("li_C").value = c;
    document.getElementById("li_M").value = m;
    document.getElementById("li_Y").value = y;
    document.getElementById("li_K").value = k;
}

function hexToRgb(hex) {
    let bigint = parseInt(hex, 16);
    let r = (bigint >> 16) & 255;
    let g = (bigint >> 8) & 255;
    let b = bigint & 255;
    document.getElementById("li_R").value = r;
    document.getElementById("li_G").value = g;
    document.getElementById("li_B").value = b;
    this.r = r;
    this.g = g;
    this.b = b;
    document.getElementById("ResultRectangle").style.background = `rgb(${this.r},${this.g},${this.b})`;
}


function hexToCMYK(hex) {
    let bigint = parseInt(hex, 16);
    let r = (bigint >> 16) & 255;
    let g = (bigint >> 8) & 255;
    let b = bigint & 255;
    let c, m, y, k;
    k = Math.min(1 - r / 255, 1 - g / 255, 1 - b / 255);
    c = (1 - r / 255 - k) / (1 - k);
    m = (1 - g / 255 - k) / (1 - k);
    y = (1 - b / 255 - k) / (1 - k);

    c = Math.round(c * 100);
    m = Math.round(m * 100);
    y = Math.round(y * 100);
    k = Math.round(k * 100);

    document.getElementById("li_C").value = c;
    document.getElementById("li_M").value = m;
    document.getElementById("li_Y").value = y;
    document.getElementById("li_K").value = k;


}

function hexToHSL(hex) {
    let result = /^#?([a-f\d]{2})([a-f\d]{2})([a-f\d]{2})$/i.exec(hex);
    let r = parseInt(result[1], 16);
    let g = parseInt(result[2], 16);
    let b = parseInt(result[3], 16);
    r /= 255, g /= 255, b /= 255;
    let max = Math.max(r, g, b), min = Math.min(r, g, b);
    let h, s, l = (max + min) / 2;
    if (max == min) {
        h = s = 0;
    } else {
        let d = max - min;
        s = l > 0.5 ? d / (2 - max - min) : d / (max + min);
        switch (max) {
            case r:
                h = (g - b) / d + (g < b ? 6 : 0);
                break;
            case g:
                h = (b - r) / d + 2;
                break;
            case b:
                h = (r - g) / d + 4;
                break;
        }
        h /= 6;
    }
    document.getElementById("li_H").value = parseInt(h * 360);
    document.getElementById("volume").value = parseInt(h * 360);
    document.getElementById("li_L").value = parseInt(l * 100);
    document.getElementById("li_S").value = parseInt(s * 100);
    HLStoColorPickerTone(h * 360, 50, 100);

    const divv = document.querySelector('#BigRectangle');
    const curss = document.querySelector('#colorPickerCursor');
    const rectt = divv.getBoundingClientRect();
    let vv = l + s * Math.min(l, 1 - l);
    let ss = 0;
    if (vv !== 0) {
        ss = 2 - 2 * l / vv;
    }

    curss.setAttribute("cx", ss * 210);
    curss.setAttribute("cy", (1 - vv) * 210);
    if (((1 - vv) * 200) > 100) {
        curss.setAttribute("stroke", "white");
    } else {
        curss.setAttribute("stroke", "black");
    }


}

function HEX() {
    let hex;
    hex = document.getElementById("input_Hex").value;
    if (hex.length !== 6) {
        alert("Введены неправильные данные!Код цвета в HEX имееет 6 символов!")
    } else {
        hexToRgb(hex);
        hexToCMYK(hex);
        hexToHSL(hex);
    }

}