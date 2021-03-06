let line1;
let line2;
let line3;
let rectangle;

let x1_1;
let y1_1;
let x2_1;
let y2_1;

let x1_2;
let y1_2;
let x2_2;
let y2_2;

let x1_3;
let y1_3;
let x2_3;
let y2_3;

let X1;
let Y1;
let X2;
let Y2;
let X3;
let Y3;
let X4;
let Y4;
let X5;
let Y5;

function readFiles(e) {
    if (window.FileList && window.File) {
        const file = e.target.files[0];
        const name = file.name ? file.name : 'NOT SUPPORTED';
        const type = file.type ? file.type : 'NOT SUPPORTED';
        const size = file.size ? file.size : 'NOT SUPPORTED';
        let r = {name, type, size};

        console.log(r)
        const reader = new FileReader();
        reader.addEventListener('load', event => {
            let content = event.target.result;
            let rows = content.split('\r\n');
            line1 = rows[0].split(' ');
            line2 = rows[1].split(' ');
            line3 = rows[2].split(' ');
            rectangle = rows[3].split(' ');

            x1_1 = parseInt(line1[0]);
            y1_1 = parseInt(line1[1]);
            x2_1 = parseInt(line1[2]);
            y2_1 = parseInt(line1[3]);

            x1_2 = parseInt(line2[0]);
            y1_2 = parseInt(line2[1]);
            x2_2 = parseInt(line2[2]);
            y2_2 = parseInt(line2[3]);

            x1_3 = parseInt(line3[0]);
            y1_3 = parseInt(line3[1]);
            x2_3 = parseInt(line3[2]);
            y2_3 = parseInt(line3[3]);

            X1 = parseInt(rectangle[0]);
            Y1 = parseInt(rectangle[1]);
            X2 = parseInt(rectangle[2]);
            Y2 = parseInt(rectangle[3]);
            X3 = parseInt(rectangle[4]);
            Y3 = parseInt(rectangle[5]);
            X4 = parseInt(rectangle[6]);
            Y4 = parseInt(rectangle[7]);
            X5 = parseInt(rectangle[8]);
            Y5 = parseInt(rectangle[9]);

            let ctx = CreateCanvas();
            ctx.beginPath();
            ctx.fillStyle = 'rgba(255,10,38,0.5)';
            ctx.moveTo(X1 * 30, 300 - Y1 * 30);
            ctx.lineTo(X2 * 30, 300 - Y2 * 30);
            ctx.lineTo(X3 * 30, 300 - Y3 * 30);
            ctx.lineTo(X4 * 30, 300 - Y4 * 30);
            ctx.lineTo(X5 * 30, 300 - Y5 * 30);
            ctx.closePath();
            ctx.fill();
            ctx.stroke();
            ctx.beginPath();
            ctx.lineWidth = 5;
            ctx.moveTo(x1_1 * 30, 300 - y1_1 * 30);
            ctx.lineTo(x2_1 * 30, 300 - y2_1 * 30);
            ctx.moveTo(x1_2 * 30, 300 - y1_2 * 30);
            ctx.lineTo(x2_2 * 30, 300 - y2_2 * 30);
            ctx.moveTo(x1_3 * 30, 300 - y1_3 * 30);
            ctx.lineTo(x2_3 * 30, 300 - y2_3 * 30);
            ctx.stroke();
        });
        reader.readAsText(file);
    }
}

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
    ctx.lineTo(300, 0); // ?????????? ????????????
    ctx.lineTo(300, 300); // ?????????? ????????
    ctx.lineTo(0, 300); // ?????????? ??????????
    ctx.lineTo(0, 0);
    ctx.stroke();
    return ctx;
}

function Onclick() {
    let tempArr = [];
    tempArr = midPoint(X1, Y1, X2, Y2, x1_3, y1_3, x2_3, y2_3, -2, 3, 0.5, "green");
    x1_3 = tempArr[0];
    y1_3 = tempArr[1];
    x2_3 = tempArr[2];
    y2_3 = tempArr[3];
    tempArr = midPoint(X5, Y5, X5, Y5, x1_1, y1_1, x2_1, y2_1, -4, 9, 0.258064, "green");
    x1_1 = tempArr[0];
    y1_1 = tempArr[1];
    x2_1 = tempArr[2];
    y2_1 = tempArr[3];
    tempArr = midPoint(X3, Y3, X3, Y3, x1_1, y1_1, x2_1, y2_1, -4, 9, 0.7333333, "black");
    x1_1 = tempArr[0];
    y1_1 = tempArr[1];
    x2_1 = tempArr[2];
    y2_1 = tempArr[3];
}

function cutLength(X_1, Y_1, X_2, Y_2) {
    return Math.sqrt( (Y_2 - Y_1)^2 + (X_2 - X_1)^2 );
}

function midPoint(X_1, Y_1, X_2, Y_2, x1, y1, x2, y2, N1, N2, t_e, color) {
    let canvas = document.getElementById("canvas");
    let Ctx = canvas.getContext("2d");
    if(cutLength(x1, y1, x2, y2) < window.screen.width) {
        return;
    }
    if((x1 < X_1 && x2 < X_1) || (y1 < Y_1 && y2 < Y_1) || (x1 > X_2 && x2 > X_2) || (y1 > Y_2 && y2 > Y_2)) {
        return;
    }
    if((x1 >= X_1 && x2 >= X_1) || (y1 >= Y_1 && y2 >= Y_1) || (x1 <= X_2 && x2 <= X_2) ||
        (y1 <= Y_2 && y2 <= Y_2)) {
        Ctx.beginPath();
        Ctx.strokeStyle = color;
        Ctx.lineWidth = 5; //?????????????? 5px
        Ctx.moveTo(x1 * 30, 300 - y1 * 30);
        Ctx.lineTo(x2 * 30, 300 - y2 * 30);
        Ctx.stroke();
    }
    x2 = (x1 + x2) / 2;
    y2 = (y1 + y2) / 2;
    x1 = (x1 + x2) / 2;
    y1 = (y1 + y2) / 2;

    return [x1, y1, x2, y2];
}

function Onclick2() {
    polygon(X1,Y1,X2,Y2,x1_3,y1_3,x2_3,y2_3,-2,3,0.5,"green");
    polygon(X5,Y5,X5,Y5,x1_1,y1_1,x2_1,y2_1,-4,9,0.258064,"green");
    polygon(X3,Y3,X3,Y3,x1_1,y1_1,x2_1,y2_1,-4,9,0.7333333,"black");
}

function polygon(X_1,Y_1,X_2,Y_2,x1,y1,x2,y2,N1,N2,t_e,color) {
    let canvas = document.getElementById("canvas");
    let Ctx = canvas.getContext("2d");
    let E_x1=X_2-X_1;
    let E_y1=Y_2-Y_1;
    if(N1*E_x1+N2*E_y1>0) {
        x2=x1+t_e*(x2-x1);
        y2=y1+t_e*(y2-x1);

    } else {
        x1=x1+t_e*(x2-x1);
        y1=y1+t_e*(y2-y1);
    }
    Ctx.beginPath();
    Ctx.strokeStyle = color;
    Ctx.lineWidth = 5; //?????????????? 5px
    Ctx.moveTo(x1*30, 300-y1*30);
    Ctx.lineTo(x2*30, 300-y2*30);
    Ctx.stroke();
}