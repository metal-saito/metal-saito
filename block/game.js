const canvas = document.getElementById('gameCanvas');
const ctx = canvas.getContext('2d');
const speedIncreaseFactor = 1.05; // 速度を増加させる割合

let x = canvas.width / 2;
let y = canvas.height - 30;
let dx = 2;
let dy = -2;
const ballRadius = 10;
let paddleHeight = 10;
let paddleWidth = 75;
let paddleX = (canvas.width - paddleWidth) / 2;
let rightPressed = false;
let leftPressed = false;
let score = 0;
let gameOver = false;
let brickRowCount = 7; // 行数を増やす
let brickColumnCount = 8; // 列数を増やす
let brickWidth = 75; // ブロックの幅
let brickHeight = 20; // ブロックの高さ
let brickPadding = 10; // ブロック間のパディング
let brickOffsetTop = 30; // 上端からのオフセット
let brickOffsetLeft = 30; // 左端からのオフセット
let bricks = [];
const colors = ["#FF5733", "#33FF57", "#3357FF", "#F033FF", "#FFC733"];

// ブロックの初期化
for(let c = 0; c < brickColumnCount; c++) {
    bricks[c] = [];
    for(let r = 0; r < brickRowCount; r++) {
        bricks[c][r] = { x: 0, y: 0, status: 1 };
    }
}

function createExplosion(brickX, brickY) {
    for (let i = 0; i < 30; i++) {
        particles.push(new Particle(brickX + brickWidth / 2, brickY + brickHeight / 2, true));
    }
}

class Particle {
    constructor(x, y, explosion = false) {
        this.x = x;
        this.y = y;
        this.size = explosion ? Math.random() * 5 + 1 : Math.random() * 3 + 1;
        this.speedX = explosion ? Math.random() * 6 - 3 : Math.random() * 2 - 1;
        this.speedY = explosion ? Math.random() * 6 - 3 : Math.random() * 2 - 1;
        this.color = explosion ? "#FF5733" : "#0095DD";
    }

    update() {
        this.x += this.speedX;
        this.y += this.speedY;
        if (this.size > 0.2) this.size -= 0.1;
    }

    draw() {
        ctx.beginPath();
        ctx.arc(this.x, this.y, this.size, 0, Math.PI * 2);
        ctx.fillStyle = this.color;
        ctx.fill();
        ctx.closePath();
    }
}

let particles = [];

function handleParticles() {
    for (let i = 0; i < particles.length; i++) {
        particles[i].update();
        particles[i].draw();

        if (particles[i].size <= 0.2) {
            particles.splice(i, 1);
            i--;
        }
    }
}
let backgroundColor = "#e4e4f0"; // 初期背景色

function updateBackgroundColor() {
    // スコアに応じて背景色を変更
    if (score > 5) {
        backgroundColor = "#00468C";
    }
    if (score > 10) {
        backgroundColor = "#008C46";
    }
    if (score > 15) {
        backgroundColor = "#8C4600";
    }
    // さらにスコアが高い場合は、他の色に変更することも可能
}



let ballTrail = []; // ボールの軌跡を保存する配列
const maxTrailLength = 5; // 軌跡の最大長さ

function drawBallTrail() {
    ballTrail.forEach((pos, index) => {
        ctx.beginPath();
        ctx.arc(pos.x, pos.y, ballRadius * (1 - index / maxTrailLength), 0, Math.PI * 2);
        ctx.fillStyle = `rgba(0, 149, 221, ${1 - index / maxTrailLength})`; // 透明度を徐々に下げる
        ctx.fill();
        ctx.closePath();
    });
}

function updateBallTrail() {
    ballTrail.unshift({x: x, y: y}); // 現在のボールの位置を追加
    if (ballTrail.length > maxTrailLength) {
        ballTrail.pop(); // 配列が長くなりすぎないように古い位置を削除
    }
}

function createParticles(brickX, brickY) {
    for (let i = 0; i < 20; i++) {
        particles.push(new Particle(brickX + brickWidth / 2, brickY + brickHeight / 2));
    }
}

// 画像オブジェクトを作成
//const brickImage = new Image();
//brickImage.src = 'boss.png'; // 画像のパス
//
//function drawBricks() {
//    for(let c = 0; c < brickColumnCount; c++) {
//        for(let r = 0; r < brickRowCount; r++) {
//            if(bricks[c][r].status == 1) {
//                let brickX = (c * (brickWidth + brickPadding)) + brickOffsetLeft;
//                let brickY = (r * (brickHeight + brickPadding)) + brickOffsetTop;
//                bricks[c][r].x = brickX;
//                bricks[c][r].y = brickY;
//                ctx.drawImage(brickImage, brickX, brickY, brickWidth, brickHeight); // 画像でブロックを描画
//            }
//        }
//    }
//}


function drawBricks() {
    for(let c = 0; c < brickColumnCount; c++) {
        for(let r = 0; r < brickRowCount; r++) {
            if(bricks[c][r].status == 1) {
                let brickX = (c * (brickWidth + brickPadding)) + brickOffsetLeft;
                let brickY = (r * (brickHeight + brickPadding)) + brickOffsetTop;
                bricks[c][r].x = brickX;
                bricks[c][r].y = brickY;
                ctx.beginPath();
                ctx.rect(brickX, brickY, brickWidth, brickHeight);
                ctx.fillStyle = colors[c % colors.length];
                ctx.shadowBlur = 20;
                ctx.shadowColor = "black";
                ctx.fill();
                ctx.closePath();
                ctx.shadowBlur = 0;
            }
        }
    }
}

function drawBall() {
    ctx.beginPath();
    ctx.arc(x, y, ballRadius, 0, Math.PI * 2);
    ctx.fillStyle = "#0095DD";
    ctx.shadowBlur = 10;
    ctx.shadowColor = "#0095DD";
    ctx.fill();
    ctx.closePath();
    ctx.shadowBlur = 0; // 他の描画に影響しないようにリセット
}
let paddleJump = 0;

function animatePaddle() {
    if (rightPressed || leftPressed) {
        paddleJump = Math.min(paddleJump + 0.5, 5); // パドルが跳ねる
    } else {
        paddleJump = Math.max(paddleJump - 0.5, 0); // パドルが元に戻る
    }
}
function drawPaddle() {
	 // パドルの描画コード...
    ctx.rect(paddleX, canvas.height - paddleHeight - paddleJump, paddleWidth, paddleHeight);
    let paddleGradient = ctx.createLinearGradient(paddleX, canvas.height - paddleHeight, paddleX + paddleWidth, canvas.height);
    paddleGradient.addColorStop(0, '#DD9500');
    paddleGradient.addColorStop(1, '#FFA500');

    ctx.beginPath();
    ctx.rect(paddleX, canvas.height - paddleHeight, paddleWidth, paddleHeight);
    ctx.fillStyle = paddleGradient;
    ctx.fill();
    ctx.closePath();
}
function updatePaddleSize() {
    if (score > 5 && score <= 10) {
        paddleWidth = 85; // スコアが5を超えるとパドルのサイズを大きくする
    } else if (score > 10) {
        paddleWidth = 95; // スコアが10を超えるとさらに大きくする
    } else {
        paddleWidth = 75; // 初期サイズ
    }
}

function drawScore() {
    ctx.font = "20px Comic Sans MS";
    ctx.fillStyle = "green";
    ctx.fillText("Score: " + score, 8, 20);

    // 特定のスコアでフィードバックを表示
    if (score % 10 === 0 && score !== 0) { // 10点ごとにフィードバック
        ctx.font = "24px Comic Sans MS";
        ctx.fillStyle = "gold";
        ctx.fillText("Great Job!", canvas.width / 2 - 60, 50);
    }
}


function drawGameOver() {
    ctx.font = "48px Comic Sans MS";
    ctx.fillStyle = "red";
    ctx.textAlign = "center";
    ctx.strokeStyle = "yellow";
    ctx.lineWidth = 3;
    ctx.strokeText("GAME OVER", canvas.width / 2, canvas.height / 2);
    ctx.fillText("GAME OVER", canvas.width / 2, canvas.height / 2);
}

function collisionDetection() {
    for(let c = 0; c < brickColumnCount; c++) {
        for(let r = 0; r < brickRowCount; r++) {
            let b = bricks[c][r];
            if(b.status == 1) {
                if(x > b.x && x < b.x + brickWidth && y > b.y && y < b.y + brickHeight) {
                    dy = -dy;
                    b.status = 0;
                    score++;
                    createParticles(b.x, b.y);
                    createExplosion(b.x, b.y); // 爆発エフェクトを生成
                    dx *= speedIncreaseFactor; // X軸の速度を増加
                    dy *= speedIncreaseFactor; // Y軸の速度を増加
                    if(score == brickRowCount * brickColumnCount) {
                        alert("YOU WIN, CONGRATULATIONS!");
                        document.location.reload();
                    }
                }
            }
        }
    }
}
function drawBackground() {
    // 背景の動的なエフェクトを描画
    // 例: 星や光の粒子をランダムに描画
    for (let i = 0; i < 50; i++) {
        ctx.beginPath();
        const x = Math.random() * canvas.width;
        const y = Math.random() * canvas.height;
        ctx.arc(x, y, Math.random() * 2, 0, Math.PI * 2);
        ctx.fillStyle = "white";
        ctx.fill();
        ctx.closePath();
    }
}
function draw() {
	drawBackground(); // 背景を描画
	updatePaddleSize();
    updateBackgroundColor(); // 背景色を更新
    ctx.clearRect(0, 0, canvas.width, canvas.height);
    drawBricks();
    drawBallTrail(); // ボールの軌跡を描画
    drawBall();
    drawPaddle();
    drawScore();
    handleParticles();
    collisionDetection();


    updateBallTrail(); // ボールの軌跡を更新

    if(x + dx > canvas.width - ballRadius || x + dx < ballRadius) {
        dx = -dx;
    }

    if(y + dy < ballRadius) {
        dy = -dy;
    } else if(y + dy > canvas.height - ballRadius) {
        if(x > paddleX && x < paddleX + paddleWidth) {
            dy = -dy;
        } else {
            gameOver = true;
        }
    }

    if(rightPressed && paddleX < canvas.width - paddleWidth) {
        paddleX += 7;
    } else if(leftPressed && paddleX > 0) {
        paddleX -= 7;
    }

    x += dx;
    y += dy;

    if(!gameOver) {
        requestAnimationFrame(draw);
    } else {
        drawGameOver();
    }
}

document.addEventListener("keydown", keyDownHandler, false);
document.addEventListener("keyup", keyUpHandler, false);

function keyDownHandler(e) {
    if(e.key == "Right" || e.key == "ArrowRight") {
        rightPressed = true;
    }
    else if(e.key == "Left" || e.key == "ArrowLeft") {
        leftPressed = true;
    }
}

function keyUpHandler(e) {
    if(e.key == "Right" || e.key == "ArrowRight") {
        rightPressed = false;
    }
    else if(e.key == "Left" || e.key == "ArrowLeft") {
        leftPressed = false;
    }
}

draw();

