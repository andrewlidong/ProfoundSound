import * as KOCH_CURVE from "./koch_curve";
import * as FRACTAL_TREE from "./fractal_tree";

document.addEventListener('DOMContentLoaded', () => {
    // const question = document.getElementsByClassName('help')[0];
    const closeButton = document.getElementsByClassName('close')[0];
    const modal = document.getElementsByClassName('modal')[0];

    closeButton.addEventListener("click", function(){
      modal.classList.add("closed");
    });
    //
    // question.addEventListener("click", function() {
    //   modal.classList.remove("closed");
    // });

    // const myKoch = document.getElementById("koch_curve");
    // const ctxKoch = myKoch.getContext("2d");
    //
    // KOCH_CURVE.draw(ctxKoch, myKoch);


    const myTree = document.getElementById("fractal_tree");
    const ctxTree = myTree.getContext("2d");


    FRACTAL_TREE.draw(350, 600, 120, 0, 10, ctxTree, myTree);
});
