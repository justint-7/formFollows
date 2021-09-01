const canvas= document.getElementById('canvas1');
const ctx=canvas.getContext('2d');
let canvasContainer = document.getElementById("canvasContainer");
canvas.width = canvasContainer.offsetWidth;
canvas.height= canvasContainer.offsetHeight;

let userInputed = false;

let canvasStyle = canvasContainer.currentStyle || window.getComputedStyle(canvasContainer);
let canvasMarginLeft= canvasStyle.marginLeft;

let rotateCounter = 0;


let particleArray = [];
let adjustX = 5;
let adjustY = 0;
let active = false;

// handle mouse
const mouse = {
    x: null,
    y: null,
    radius: 75
}


function generateParticles(){
    for (let y = 0, y2= textCoordinates.height; y < y2; y++){
        for (let x = 0, x2 = textCoordinates.width; x < x2; x++){
            if (textCoordinates.data[(y*4*textCoordinates.width) + (x*4) +3]>128){
                let positionX = x + adjustX;
                let positionY = y + adjustY;
                particleArray.push(new Particle(positionX*5, positionY*5));
            }
        }
    }
}


function animate(){
    ctx.clearRect(0, 0, canvas.width, canvas.height);
    for (let i = 0; i < particleArray.length; i ++){
        particleArray[i].draw();
        particleArray[i].update();
    }
    requestAnimationFrame(animate);
}

class Line {
    constructor(line,x,y){
        this.line = line;
        this.x = x;
        this.y = y;
    }
}

function wrapText(context, text, x, wrapY, maxWidth, lineHeight) {
    let words = text.split(' ');
    let wrapArray = [];
    let line = '';
    for(let n = 0; n < words.length; n++) {
        let testLine = line + words[n] + ' ';
        let metrics = context.measureText(testLine);
        let testWidth = metrics.width;
        if (testWidth > maxWidth && n > 0) {
            wrapArray.push(new Line(line,x,wrapY));
            line = words[n] + ' ';
            wrapY += lineHeight;
        }
        else {
            line = testLine;
        }
    }
    wrapArray.push(new Line(line,x,wrapY));

    wrapArray.forEach(element => {
        element.y= element.y + 35 - (wrapArray.length*lineHeight)/2
        context.fillText(element.line, element.x, element.y)              
    });


  }
  


  let lineHeight = 20;
  let maxWidth= 95;
  let wrapX = 47;
  let wrapY = 30

  ctx.textAlign = 'center';
ctx.fillStyle= 'rgb(255, 165, 0)';
ctx.font= '16px Verdana';
fontChange ();
const defaulTextArray =[
    'Form Follows Function',
    'Cultures Fermented',
    'Share your Message!'
]

let text = defaulTextArray[rotateCounter];
wrapText(ctx, defaulTextArray[rotateCounter], wrapX, wrapY, maxWidth, lineHeight);

let textCoordinates = ctx.getImageData(0,0,200,100);



console.log (canvasContainer.offsetWidth);
function getMousePos(canvas, e) {
    var rect = canvas.getBoundingClientRect();
    mouse.x= e.clientX - rect.left
    mouse.y= e.clientY - rect.top

}

function addEventListeners(){
    canvas.addEventListener('mousemove', (event)=>{
        getMousePos(canvas, event);
     })

     
     canvas.addEventListener('touchmove', (event)=>{
         event.preventDefault();
        getMousePos(canvas, event);
     })
     
     canvas.addEventListener('mouseenter', ()=>{
         active = true;
         if (rotateCounter <2 && userInputed===false) {
            ctx.clearRect(0, 0, 200, 100)
            wrapText(ctx, defaulTextArray[rotateCounter], wrapX, wrapY, maxWidth, lineHeight);
            const positionArray = [];
            let counter = 0;
            textCoordinates = ctx.getImageData(0,0,200,100);

            for (let y = 0, y2= textCoordinates.height; y < y2; y++){
                for (let x = 0, x2 = textCoordinates.width; x < x2; x++){
                    if (textCoordinates.data[(y*4*textCoordinates.width) + (x*4) +3]>128){
                        let positionX = x + adjustX;
                        let positionY = y + adjustY;
                        positionArray.push([positionX*5, positionY*5]);
                    }
                }
            }
            for (let z = 0; z < particleArray.length; z++){
                particleArray[z].baseX = positionArray[counter][0];
                particleArray[z].baseY = positionArray[counter][1];
                counter +=1
                if (counter>=positionArray.length){
                    counter=0;
                }
            }
            rotateCounter +=1
         } else if (rotateCounter>=2 && userInputed===false ){
             ctx.clearRect(0, 0, 200, 100)
             wrapText(ctx, defaulTextArray[rotateCounter], wrapX, wrapY, maxWidth, lineHeight);
             const positionArray = [];
             let counter = 0;
             textCoordinates = ctx.getImageData(0,0,200,100);
 
          for (let y = 0, y2= textCoordinates.height; y < y2; y++){
             for (let x = 0, x2 = textCoordinates.width; x < x2; x++){
                 if (textCoordinates.data[(y*4*textCoordinates.width) + (x*4) +3]>128){
                     let positionX = x + adjustX;
                     let positionY = y + adjustY;
                     positionArray.push([positionX*5, positionY*5]);
                 }
             }
         }
          for (let z = 0; z < particleArray.length; z++){
              particleArray[z].baseX = positionArray[counter][0];
              particleArray[z].baseY = positionArray[counter][1];
              counter +=1
              if (counter>=positionArray.length){
                  counter=0;
              }
          }
            rotateCounter=0
        }
     })

     canvas.addEventListener('touchstart', ()=>{
        active = true;
        if (rotateCounter <2 && userInputed===false) {
            ctx.clearRect(0, 0, 200, 100)
            wrapText(ctx, defaulTextArray[rotateCounter], wrapX, wrapY, maxWidth, lineHeight);
            const positionArray = [];
            let counter = 0;
            textCoordinates = ctx.getImageData(0,0,200,100);

            for (let y = 0, y2= textCoordinates.height; y < y2; y++){
                for (let x = 0, x2 = textCoordinates.width; x < x2; x++){
                    if (textCoordinates.data[(y*4*textCoordinates.width) + (x*4) +3]>128){
                        let positionX = x + adjustX;
                        let positionY = y + adjustY;
                        positionArray.push([positionX*5, positionY*5]);
                    }
                }
            }
            for (let z = 0; z < particleArray.length; z++){
                particleArray[z].baseX = positionArray[counter][0];
                particleArray[z].baseY = positionArray[counter][1];
                counter +=1
                if (counter>=positionArray.length){
                    counter=0;
                }
            }
            rotateCounter +=1
         } else if (rotateCounter>=2 && userInputed===false ){
             ctx.clearRect(0, 0, 200, 100)
             wrapText(ctx, defaulTextArray[rotateCounter], wrapX, wrapY, maxWidth, lineHeight);
             const positionArray = [];
             let counter = 0;
             textCoordinates = ctx.getImageData(0,0,200,100);
 
          for (let y = 0, y2= textCoordinates.height; y < y2; y++){
             for (let x = 0, x2 = textCoordinates.width; x < x2; x++){
                 if (textCoordinates.data[(y*4*textCoordinates.width) + (x*4) +3]>128){
                     let positionX = x + adjustX;
                     let positionY = y + adjustY;
                     positionArray.push([positionX*5, positionY*5]);
                 }
             }
         }
          for (let z = 0; z < particleArray.length; z++){
              particleArray[z].baseX = positionArray[counter][0];
              particleArray[z].baseY = positionArray[counter][1];
              counter +=1
              if (counter>=positionArray.length){
                  counter=0;
              }
          }
            rotateCounter=0
        }
    })



     canvas.addEventListener('mouseleave', ()=>{
         active = false;
     })
     canvas.addEventListener('touchend', ()=>{
        active = false;
    })

     input = document.getElementById("formFollowsInput");
     

     input.addEventListener('input',()=>{
        userInputed= true;
        if (input.value ===""){
            userInputed=false;
        }
         const positionArray = [];
         let counter = 0;
         ctx.clearRect(0, 0, 200, 100)
         wrapText(ctx, input.value, wrapX, wrapY, maxWidth, lineHeight);
         textCoordinates = ctx.getImageData(0,0,200,100);

         for (let y = 0, y2= textCoordinates.height; y < y2; y++){
            for (let x = 0, x2 = textCoordinates.width; x < x2; x++){
                if (textCoordinates.data[(y*4*textCoordinates.width) + (x*4) +3]>128){
                    let positionX = x + adjustX;
                    let positionY = y + adjustY;
                    positionArray.push([positionX*5, positionY*5]);
                }
            }
        }
         for (let z = 0; z < particleArray.length; z++){
             particleArray[z].baseX = positionArray[counter][0];
             particleArray[z].baseY = positionArray[counter][1];
             counter +=1
             if (counter>=positionArray.length){
                 counter=0;
             }
         }
     })

     window.addEventListener('resize', function() {
         console.log ("width:" + canvasContainer.offsetWidth)
        //  console.log ("height:" + canvasContainer.offsetHeight)
    
        // canvas.height= canvasContainer.offsetHeight;
        fontChange();

    });

     
}

function fontChange (){
    if (canvasContainer.offsetWidth >= 455){
        ctx.font= '16px Verdana';
        wrapX= 70;
    }
    else if (canvasContainer.offsetWidth<290){
        ctx.font= '8px Verdana';
        maxWidth= 45;
        wrapX= 24;
    }
    else if (canvasContainer.offsetWidth<308){
        ctx.font= '8px Verdana';
        maxWidth= 45;
        wrapX= 27;
    }
    else if (canvasContainer.offsetWidth<316){
        ctx.font= '10px Verdana';
        maxWidth= 60;
        wrapX= 31;
    }
    else if (canvasContainer.offsetWidth<352){
        ctx.font= '11px Verdana';
        maxWidth= 65;
        wrapX= 31;
    }
    else if (canvasContainer.offsetWidth<375){
        ctx.font= '12px Verdana';
        maxWidth= 80;
        wrapX= 35;
    }else if (canvasContainer.offsetWidth<400){
        ctx.font= '13px Verdana';
        maxWidth= 80;
        wrapX= 37;
    }else if (canvasContainer.offsetWidth<425){
        ctx.font= '14px Verdana';
        maxWidth= 90;
        wrapX= 39;
    }else if (canvasContainer.offsetWidth<455){
        ctx.font= '15px Verdana';
        maxWidth= 90;
        wrapX= 43;
    }

}



function randomDirection(max){
    let positiveCheck = Math.random();
    if (positiveCheck > 0.5){
        return (Math.random()*max)
    } else return -(Math.random()*max)

}

function randomColour(){
    const colourArray = ["#72BF44","#FBE59F","#ED2683", "#0955A6", "#8AC975", "#EED997", "#EE294C", "#31328D", "#0E9A48", "#ECBF1D", "#EE294C", "#231F20", "#9DBB3B", "#9C4126", "#CC4699", "#208EC6"
    ]
    let random = Math.floor(Math.random() * 16);
    return colourArray[random]        
}


class Particle {
    constructor(x,y){
        this.x = Math.random()*canvas.width;
        this.y = Math.random()*canvas.height;
        this.size = Math.random()*4;
        this.baseX = x;
        this.baseY = y;
        this.density = (Math.random()* 30) + 1;
        this.randomDirectionX = randomDirection(canvas.width)
        this.randomDirectionY = randomDirection(canvas.height)
        // this.r = (Math.random()*255).toString();
        // this.b = (Math.random()*255).toString();
        // this.g = (Math.random()*255).toString();
        this.colour = randomColour();
    }
    draw(){
        ctx.fillStyle = this.colour;
        // ctx.fillStyle = `rgb(${this.r}, ${this.g}, ${this.b})`;
        ctx.beginPath();
        ctx.arc(this.x,this.y,this.size,0,Math.PI*2);
        ctx.closePath();
        ctx.fill();
    }
    update(){
        if (active === true){
            let dx = mouse.x - this.x;
            let dy = mouse.y - this.y;
            let distance = Math.sqrt(dx*dx + dy*dy);
            let forceDirectionX = dx/distance;
            let forceDirectionY = dy/distance;
            let maxDistance = mouse.radius;
            let force = (maxDistance - distance) / maxDistance;
            let directionX = forceDirectionX * force * this.density;
            let directionY = forceDirectionY * force * this.density;


            if (distance < mouse.radius){
                this.x -= directionX ;
                this.y -= directionY ;
            } else{
                if (this.x !== this.baseX){
                    let dx = this.x - this.baseX;
                    this.x -= dx/10;
                }
                if (this.y !== this.baseY){
                    let dy = this.y - this.baseY;
                    this.y -= dy/10;
                }
            }
        } else{
            this.x += this.randomDirectionX/600 
            this.y += this.randomDirectionY/600 
            if (this.x >= canvas.width || this.x <= 0 ){
                this.randomDirectionX=randomDirection(canvas.width)
            }
            if (this.y >= canvas.height || this.y <= 0 ){
                this.randomDirectionY=randomDirection(canvas.height)
            }
        }


    }

}





function init(){
    addEventListeners();
    particleArray = [];    
    generateParticles();
    generateParticles();
    generateParticles();
    generateParticles();
    animate();
    
}

init();



