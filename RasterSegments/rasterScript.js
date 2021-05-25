function CreateCanvas() {
    let canvas = document.getElementById("canvas");
    let ctx = canvas.getContext("2d");
    ctx.clearRect(0, 0, canvas.width, canvas.height);
    ctx.beginPath();
    ctx.strokeStyle = "black";
    ctx.lineWidth = 2;
    ctx.moveTo(0, 0);
    let k1 = 30;
    for (let i = 1; i <= 10; i++) {
        ctx.fillStyle = "black";
        ctx.lineTo(k1 - 30, 300);
        ctx.moveTo(k1, 0);
        ctx.fillText(i, k1 - 2, 310);
        k1 = k1 + 30;
    }
    let k = 30;

    for (let i = 1; i <= 10; i++) {
        ctx.fillStyle = "black";
        ctx.lineTo(300, k - 30);
        ctx.moveTo(0, k);
        ctx.fillText((10 - i).toString(), 2, k - 2);
        k = k + 30;
    }
    ctx.moveTo(0, 0);
    ctx.lineTo(300, 0);
    ctx.lineTo(300, 300);
    ctx.lineTo(0, 300);
    ctx.lineTo(0, 0);
    ctx.stroke();

    ctx.beginPath();
    ctx.strokeStyle = "black";
    ctx.lineWidth = 5;
    ctx.moveTo(60, 90);
    ctx.lineTo(240, 240);
    ctx.stroke();
    return ctx;
}

function CreateCanvasCircle() {
    let canvas = document.getElementById("canvas");
    let ctx = canvas.getContext("2d");
    ctx.clearRect(0, 0, canvas.width, canvas.height);
    ctx.beginPath();
    ctx.strokeStyle = "black";
    ctx.lineWidth = 2;
    ctx.moveTo(0, 0);
    let k1 = 30;
    for (let i = 1; i <= 10; i++) {
        ctx.fillStyle = "black";
        ctx.lineTo(k1 - 30, 300);
        ctx.moveTo(k1, 0);
        ctx.fillText(i, k1 - 2, 310);
        k1 = k1 + 30;
    }

    let k = 30;

    for (let i = 1; i <= 10; i++) {
        ctx.fillStyle = "black";
        ctx.lineTo(300, k - 30);
        ctx.moveTo(0, k);
        ctx.fillText((10 - i).toString(), 2, k - 2);
        k = k + 30;
    }
    ctx.moveTo(0, 0);
    ctx.lineTo(300, 0);
    ctx.lineTo(300, 300);
    ctx.lineTo(0, 300);
    ctx.lineTo(0, 0);
    ctx.stroke();

    ctx.beginPath();
    ctx.strokeStyle = "black";
    ctx.lineWidth = 5; // толщина линии
    ctx.arc(150, 150, 90, 0, 2 * Math.PI, true);
    ctx.stroke();
    return ctx;
}

CreateCanvas();
function onChange() {
    let n = document.getElementById("box").options.selectedIndex;
    let val = document.getElementById("box").options[n].value;

    //Пошаговый алогритм
    if (val === 2) {
        let ctx = CreateCanvas();
        ctx.beginPath();
        ctx.strokeStyle = "red";
        ctx.lineWidth = 2; //толщина 5px
        ctx.moveTo(60, 90);
        //ЦДА
        let xStart = 60;
        let yStart = 90;
        let yEnd = 240;
        let xEnd = 240;
        let Dx = xEnd - xStart;
        let Dy = yEnd - yStart;
        let x = xStart;
        let y = yStart;

        if (Dx < Dy) {
            while (y < yEnd) {
                y = y + 30;
                x = Math.round(x + Dx / Dy * 30);
                ctx.lineTo(x, y);
                ctx.moveTo(x, y);
            }
        } else {
            while (x < xEnd) {
                x = x + 30;
                y = Math.round(y + Dy / Dx * 30);
                ctx.lineTo(x, y);
                ctx.moveTo(x, y);
            }
        }

        ctx.stroke();
    }

    //ЦДА
    if (val === 1) {
        ctx = CreateCanvas();
        ctx.beginPath();
        ctx.strokeStyle = "red";
        ctx.lineWidth = 2; //толщина 5px
        ctx.moveTo(60, 90);
        /*Пошаговый алгоритм*/
        let K = 5 / 6;
        let b = 40;
        let len = 180;
        let x = 60;
        let y = 0;

        for (let i = 1; i < len; i++) {
            y = Math.round(K * x + b);
            x = x + 1;
            ctx.lineTo(x, y);
            ctx.moveTo(x, y);
        }
    }

    //Алгоритм Брезенхема на отрезке
    if (val === 3) {
        let ctx = CreateCanvas();
        ctx.beginPath();
        let x1 = 60;
        let x2 = 240;
        let y1 = 90;
        let y2 = 240;
        let dx = (x2 - x1 >= 0 ? 30 : -30);
        let dy = (y2 - y1 >= 0 ? 30 : -30);

        let lengthX = Math.abs(x2 - x1);
        let lengthY = Math.abs(y2 - y1);

        let length = Math.max(lengthX, lengthY);

        if (length === 0) {
            ctx.rect(x1, y1, 30, 30);
            ctx.fillStyle = "red";
            ctx.fill();
        }

        if (lengthY <= lengthX) {
            // Начальные значения
            let x = x1;
            let y = y1;
            let d = -lengthX;

            // Основной цикл
            length++;
            while (x < x2) {
                // ctx.fillStyle = 'rgba(255,10,38,0.1)'; //для линий
                ctx.fillStyle = "rgba(180,180,180,0.5)";
                ctx.strokeStyle = 'rgba(255,10,38,0.2)'
                ctx.rect(x, y, 30, 30);

                ctx.fill();
                x += dx;
                d += 2 * lengthY;
                if (d > 0) {
                    d -= 2 * lengthX;
                    y += dy;
                }
                ctx.moveTo(x, y);
            }
        } else {
            let x = x1;
            let y = y1;
            let d = -lengthY;
            length++;
            while (y <= y2) {
                ctx.rect(x, y, 30, 30);
                ctx.fill();
                y += dy;
                d += 2 * lengthX;
                if (d > 0) {
                    d -= 2 * lengthY;
                    x += dx;
                }
                ctx.moveTo(x, y);
            }
        }
        ctx.stroke();
    }

    //Алгоритм Бразенхема на окружности
    if (val === 4) {
        let ctx = CreateCanvasCircle();
        ctx.beginPath();
        let R = 90;
        let X = 0;
        let delta = 90 - 2 * R;
        let error = 0;
        let Y = R;
        ctx.strokeStyle = 'rgba(255,10,38,0.2)'
        ctx.fillStyle = "rgba(120,120,120,0.2)";
        ctx.fill();
        while (Y >= 0) {
            ctx.strokeStyle = 'rgba(255,10,38,0.2)'
            ctx.rect(150 + X, 150 + Y, -30, 30);
            ctx.rect(150 + X, 150 - Y, -30, 30);
            ctx.rect(150 - X, 150 + Y, 30, 30);
            ctx.rect(150 - X, 150 - Y, 30, 30);
            ctx.fillStyle = "rgba(120,120,120,0.2)";
            ctx.fill();
            error = 2 * (delta + Y) - 30;
            if ((delta < 0) && (error <= 0)) {
                X = X + 30;
                delta += 2 * X + 30;

                continue;
            }
            if ((delta > 0) && (error > 0)) {
                Y = Y - 30;
                delta -= 2 * Y + 30;
                continue;
            }
            X = X + 30;
            delta += 2 * (X - Y);
            Y = Y - 30;
        }

        ctx.strokeStyle = 'rgba(255,10,38,0.5)'
        ctx.rect(X, Y, -30, -30);
        ctx.fillStyle = "rgba(120,120,120,0.5)";
        ctx.fill();
        ctx.stroke();
    }
    if (val === 5 || val === 7) {
        ctx = CreateCanvas();
    }
    if (val === 6) {
        ctx = CreateCanvasCircle();
    }
    ctx.stroke();
}

/*<style>
        body {
            //background-image: url(https://artfiles.alphacoders.com/838/thumb-1920-83844.jpg);
            background-repeat: no-repeat;
            background-position: center center;
            background-attachment: fixed;
            -webkit-background-size: cover;
            -moz-background-size: cover;
            -o-background-size: cover;
            background-size: cover;
        }

        .big-block {
            padding-left: 35%;
            padding-top: 10%;
            align-content: center;
        }

        .box {
            margin-left: 25px;
            width: 250px;
            height: 30px;
            border: 1px solid #999;
            font-size: 18px;
            color: #1c87c9;
            background-color: #eee;
            border-radius: 5px;
            box-shadow: 4px 4px #ccc;
        }
    </style>*/