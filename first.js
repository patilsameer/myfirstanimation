console.log("Hello world!!!");
var c = document.getElementById("myCanvas");
var ctx = c.getContext("2d");
let loadImage = (src, callback) => {
    let img = document.createElement("img");
    img.onload = () => callback(img);
    img.src = src;
};

let imagePath = (number, animation) => {
    // console.log("idle/"+number+".png");
    return animation + "/" + number + ".png";

}
let frames={
    idle: [1,2,3,4,5,6,7,8],
    kick: [1,2,3,4,5,6,7],
    punch: [1,2,3,4,5,6,7]
};
let images = { idle: [], kick: [], punch :[]};
let loadImages = (callback) => {
    //let images=[];
    let remaingingImages = 0;
    ["idle","kick","punch"].forEach((animation) => {
        let animationframes=frames[animation];
        remaingingImages+=animationframes.length;

        animationframes.forEach((framenumber)=>{
            let path = imagePath(framenumber,animation);
            loadImage(path, (image) => {
                images[animation][framenumber - 1] = image;
                remaingingImages -= 1;
                console.log(remaingingImages);
                if (remaingingImages === 0) {
                    callback(images);
                }
            });
        });

        
    });
}; 

let animate = (ctx, images, animation,callback) => {
    images[animation].forEach((image, index) => {
        setTimeout(() => {
            ctx.clearRect(0, 0, 400, 400);
            ctx.drawImage(image, 0, 0, 400, 400)
        }, index * 100);
    });
    setTimeout(callback, images[animation].length * 100);

};
loadImages((iamges) => {
     let queuedanimation=[];
     //let selectedanimation="idle";
     let aux=()=>{
        if(queuedanimation.length===0){
            selectedanimation="idle";
        }
        else{
            selectedanimation=queuedanimation.shift();
        }
        animate(ctx,images,selectedanimation,aux);
     }
     aux();

     document.getElementById("kick").onclick=()=>{
         //selectedanimation="kick"
         queuedanimation.push("kick");
     };
     document.getElementById("punch").onclick=()=>{
        //selectedanimation="punch"
        queuedanimation.push("punch");
    };

    document.addEventListener('keyup', (event)=> {
        const key = event.key; // "ArrowRight", "ArrowLeft", "ArrowUp", or "ArrowDown"
        if(key==="ArrowLeft"){
            queuedanimation.push("kick");
        }
        else if(key==="ArrowRight"){
            queuedanimation.push("punch");
        }
    });
   //  animate(ctx, images, "idle",() => { console.log("done"); });
    // ctx.drawImage(images[7],0,0,400,400);
});
