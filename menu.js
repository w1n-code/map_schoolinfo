document.addEventListener("DOMContentLoaded", function () {
    const copyPhraseElement = document.getElementById("copyPhrase");
    const hiddenTextArea = document.getElementById("hiddenTextArea");
    const originalText = copyPhraseElement.innerText;
    const siteURL = window.location.href;

    copyPhraseElement.addEventListener("click", function () {
        hiddenTextArea.value = siteURL;
        hiddenTextArea.select();
        document.execCommand("copy");
        
        copyPhraseElement.innerText = "URL이 복사되었습니다";

        setTimeout(function () {
        copyPhraseElement.innerText = originalText;
        }, 2000);
    });
});
