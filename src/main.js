window.onload = function() {
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
};
