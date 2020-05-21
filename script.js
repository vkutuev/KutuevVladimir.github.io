var datasetIndex = 0;
var images = [];
var imagePaths;
var bestAlgorithm = [];
for (var i = 0; i < fs_JSON.length; i++) {
    bestAlgorithm.push(0);
}
var summaryPage = false;
var cssPrefix;
var gesturableImg;
var isMobile;
var textResources = resources.ru;

if (/(android|bb\d+|meego).+mobile|avantgo|bada\/|blackberry|blazer|compal|elaine|fennec|hiptop|iemobile|ip(hone|od)|ipad|iris|kindle|Android|Silk|lge |maemo|midp|mmp|netfront|opera m(ob|in)i|palm( os)?|phone|p(ixi|re)\/|plucker|pocket|psp|series(4|6)0|symbian|treo|up\.(browser|link)|vodafone|wap|windows (ce|phone)|xda|xiino/i.test(navigator.userAgent)
    || /1207|6310|6590|3gso|4thp|50[1-6]i|770s|802s|a wa|abac|ac(er|oo|s-)|ai(ko|rn)|al(av|ca|co)|amoi|an(ex|ny|yw)|aptu|ar(ch|go)|as(te|us)|attw|au(di|-m|r |s )|avan|be(ck|ll|nq)|bi(lb|rd)|bl(ac|az)|br(e|v)w|bumb|bw-(n|u)|c55\/|capi|ccwa|cdm-|cell|chtm|cldc|cmd-|co(mp|nd)|craw|da(it|ll|ng)|dbte|dc-s|devi|dica|dmob|do(c|p)o|ds(12|-d)|el(49|ai)|em(l2|ul)|er(ic|k0)|esl8|ez([4-7]0|os|wa|ze)|fetc|fly(-|_)|g1 u|g560|gene|gf-5|g-mo|go(\.w|od)|gr(ad|un)|haie|hcit|hd-(m|p|t)|hei-|hi(pt|ta)|hp( i|ip)|hs-c|ht(c(-| |_|a|g|p|s|t)|tp)|hu(aw|tc)|i-(20|go|ma)|i230|iac( |-|\/)|ibro|idea|ig01|ikom|im1k|inno|ipaq|iris|ja(t|v)a|jbro|jemu|jigs|kddi|keji|kgt( |\/)|klon|kpt |kwc-|kyo(c|k)|le(no|xi)|lg( g|\/(k|l|u)|50|54|-[a-w])|libw|lynx|m1-w|m3ga|m50\/|ma(te|ui|xo)|mc(01|21|ca)|m-cr|me(rc|ri)|mi(o8|oa|ts)|mmef|mo(01|02|bi|de|do|t(-| |o|v)|zz)|mt(50|p1|v )|mwbp|mywa|n10[0-2]|n20[2-3]|n30(0|2)|n50(0|2|5)|n7(0(0|1)|10)|ne((c|m)-|on|tf|wf|wg|wt)|nok(6|i)|nzph|o2im|op(ti|wv)|oran|owg1|p800|pan(a|d|t)|pdxg|pg(13|-([1-8]|c))|phil|pire|pl(ay|uc)|pn-2|po(ck|rt|se)|prox|psio|pt-g|qa-a|qc(07|12|21|32|60|-[2-7]|i-)|qtek|r380|r600|raks|rim9|ro(ve|zo)|s55\/|sa(ge|ma|mm|ms|ny|va)|sc(01|h-|oo|p-)|sdk\/|se(c(-|0|1)|47|mc|nd|ri)|sgh-|shar|sie(-|m)|sk-0|sl(45|id)|sm(al|ar|b3|it|t5)|so(ft|ny)|sp(01|h-|v-|v )|sy(01|mb)|t2(18|50)|t6(00|10|18)|ta(gt|lk)|tcl-|tdg-|tel(i|m)|tim-|t-mo|to(pl|sh)|ts(70|m-|m3|m5)|tx-9|up(\.b|g1|si)|utst|v400|v750|veri|vi(rg|te)|vk(40|5[0-3]|-v)|vm40|voda|vulc|vx(52|53|60|61|70|80|81|83|85|98)|w3c(-| )|webc|whit|wi(g |nc|nw)|wmlb|wonu|x700|yas-|your|zeto|zte-/i.test(navigator.userAgent.substr(0, 4))) {
    isMobile = true;
    cssPrefix = `mobile`;
} else {
    isMobile = false;
    cssPrefix = `desktop`;
    window.addEventListener("keydown", function (event) {
        switch (event.code) {
            case "BracketLeft": {
                prevDataset();
                break
            }
            case "BracketRight": {
                nextDataset();
                break
            }
        }
        switch (event.key) {
            case '1':
                selectSlide(1);
                break;
            case '2':
                selectSlide(2);
                break;
            case '3':
                selectSlide(3);
                break;
            case '4':
                selectSlide(4);
                break;
        }
    });
}

window.addEventListener('devicelight', function (e) {
    var lux = e.value;
    alert(lux);
});

window.onresize = function () {
    if (!this.summaryPage) {
        showSlide();
    }
}
showDataset();

function setDataset(dataset) {
    imagePaths = [];
    return Array.from(fs_JSON[dataset].files, file => {
        var path = fs_JSON[dataset].dir + "/" + file;
        imagePaths.push(path);
        var img = new Image();
        img.src = path;
        return img;
    });
}

function showSlide() {
    var index = bestAlgorithm[datasetIndex] != 0 ? bestAlgorithm[datasetIndex] - 1 : 0;
    showSlideByPath(imagePaths[index]);
}

function selectSlide(index) {
    if (index > images.length) {
        return
    }
    else if (index < 1) {
        return
    }
    selectAlgo(index);
    bestAlgorithm[datasetIndex] = index;
}

function showDataset() {
    images.forEach(elem => {
        elem.src = ``;
    });
    images = setDataset(datasetIndex);
    showSlide();
}

function nextDataset() {
    if (summaryPage) {
        return;
    }
    if (datasetIndex == fs_JSON.length - 1) {
        summaryPage = true;
        showSummary();
        return;
    }
    datasetIndex++;
    showDataset();
}

function prevDataset() {
    if (summaryPage) {
        summaryPage = false;
        showDataset();
        return;
    }
    if (datasetIndex == 0) {
        return;
    }
    datasetIndex--;
    showDataset();
}

function getMainContainer() {
    return document.getElementById("main-container");
}

function createAlgorithmBtn(index) {
    var algo = document.createElement("a");
    if ((index + 1) == bestAlgorithm[datasetIndex]) {
        algo.className = `${cssPrefix}-algo ${cssPrefix}-algo-active`;
    } else {
        algo.className = `${cssPrefix}-algo`;
        algo.setAttribute("onclick", `selectSlide(${index + 1})`);
    }

    algo.appendChild(document.createTextNode(`${index + 1}`));
    return algo;
}

function addAlgorithms(element) {
    var algoText = document.createElement("a");
    algoText.className = `${cssPrefix}-bar-algo-text`;
    algoText.appendChild(document.createTextNode(`${textResources.image} `));
    element.appendChild(algoText);

    if (!isMobile) {
        for (var i = 0; i < images.length; i++) {
            element.appendChild(createAlgorithmBtn(i));
        }
    } else {
        for (var i = images.length - 1; i >= 0; i--) {
            element.appendChild(createAlgorithmBtn(i));
        }
    }
}

function getHeader() {
    var header = document.createElement("nav");
    header.className = `${cssPrefix}-header`;

    var prevBtn = document.createElement("a");
    prevBtn.className = `${cssPrefix}-navigation`;
    prevBtn.appendChild(document.createTextNode("<"));
    prevBtn.setAttribute("onclick", "prevDataset()");
    var imageText = document.createElement("a");
    imageText.className = `${cssPrefix}-bar-image-text`;
    imageText.appendChild(document.createTextNode(`${textResources.set} ${datasetIndex + 1}/${fs_JSON.length}`));
    var nextBtn = document.createElement("a");
    nextBtn.className = `${cssPrefix}-navigation`;
    nextBtn.appendChild(document.createTextNode(">"));
    nextBtn.setAttribute("onclick", "nextDataset()");

    if (!isMobile) {
        header.appendChild(prevBtn);
        header.appendChild(imageText);
        header.appendChild(nextBtn);

        var verticalLine = document.createElement("div");
        verticalLine.className = `${cssPrefix}-vertical-line`;
        header.appendChild(verticalLine);
        addAlgorithms(header);
    } else {
        header.appendChild(imageText);
        // This order of buttons because right floating
        header.appendChild(nextBtn);
        header.appendChild(prevBtn);
    }

    return header;
}

function getFooter() {
    var footer = document.createElement("nav");
    footer.className = `${cssPrefix}-footer`;

    addAlgorithms(footer);
    return footer;
}

function showSlideByPath(path) {
    var container = getMainContainer();
    container.innerHTML = "";

    // Add header
    container.appendChild(getHeader());

    if (!isMobile) {
        var helpText = document.createElement("div");
        helpText.className = `${cssPrefix}-help-text`;
        textNode = document.createTextNode(`${textResources.help}`);
        helpText.appendChild(textNode);
        helpText.appendChild(document.createElement("p"));
        textNode = document.createTextNode(`${textResources.help_select}`);
        helpText.appendChild(textNode);
        helpText.appendChild(document.createElement("p"));
        textNode = document.createTextNode(`${textResources.help_prev}`);
        helpText.appendChild(textNode);
        helpText.appendChild(document.createElement("p"));
        textNode = document.createTextNode(`${textResources.help_next}`);
        helpText.appendChild(textNode);
        helpText.appendChild(document.createElement("p"));
        textNode = document.createTextNode(`${textResources.help_save_choice[0]}`);
        helpText.appendChild(textNode);
        helpText.appendChild(document.createElement("p"));
        textNode = document.createTextNode(`${textResources.help_save_choice[1]}`);
        helpText.appendChild(textNode);
        helpText.appendChild(document.createElement("p"));
        textNode = document.createTextNode(`${textResources.help_save_choice[2]}`);
        helpText.appendChild(textNode);
        container.appendChild(helpText);
    }

    var canvas = document.createElement("canvas");
    canvas.className = "img-canvas";
    container.appendChild(canvas);

    // Add footer
    if (isMobile) {
        container.appendChild(getFooter());
    }

    gesturableImg = new ImgTouchCanvas({
        canvas: canvas,
        path: path,
        desktop: !isMobile
    });
}


function getResultsText() {
    var strBuilder = [];
    strBuilder.push(`+-------+------------+\n`);
    strBuilder.push(`| ${textResources.set} | ${textResources.your_choice}  |\n`);
    strBuilder.push(`+-------+------------+\n`);
    bestAlgorithm.forEach(function (item, index) {
        strBuilder.push("| ");
        strBuilder.push(" ".repeat(5 - (index + 1).toString().length));
        strBuilder.push((index + 1).toString());
        strBuilder.push(" | ");
        if (item != 0) {
            strBuilder.push(item.toString());
            strBuilder.push(" ".repeat(10 - item.toString().length));
            strBuilder.push(" |\n");
        } else {
            strBuilder.push(`${textResources.not_chosen} |\n`);
        }
    });
    strBuilder.push(`+-------+------------+`);
    return strBuilder.join("");
}

function getDeviceText() {
    var strBuilder = [];
    strBuilder.push(`Device: `);
    if (isMobile) {
        strBuilder.push(`Mobile\n`);
    } else {
        strBuilder.push(`Desktop\n`);
    }
    var width_px = window.innerWidth;
    var height_px = window.innerHeight;
    strBuilder.push(`Window: ${width_px}x${height_px}\n`);
    strBuilder.push(`User agent: ${navigator.userAgent}`);
    return strBuilder.join("");
}

function showSummary() {
    var container = getMainContainer();
    container.innerHTML = "";

    var navigation = document.createElement(`nav`);
    navigation.className = `${cssPrefix}-header`;

    var prevBtn = document.createElement("a");
    prevBtn.className = `${cssPrefix}-navigation`;
    prevBtn.appendChild(document.createTextNode(`<`));
    prevBtn.setAttribute(`onclick`, `prevDataset()`);
    var imageText = document.createElement("a");
    imageText.className = `${cssPrefix}-bar-image-text`;
    imageText.appendChild(document.createTextNode(`${textResources.summary}`));

    if (!isMobile) {
        navigation.appendChild(prevBtn);
        navigation.appendChild(imageText);
        var helpText = document.createElement("div");
        helpText.className = `${cssPrefix}-help-text`;
        textNode = document.createTextNode(`${textResources.help}`);
        helpText.appendChild(textNode);
        helpText.appendChild(document.createElement("p"));
        textNode = document.createTextNode(`${textResources.help_prev}`);
        helpText.appendChild(textNode);
        container.appendChild(helpText);
    } else {
        navigation.appendChild(imageText);
        navigation.appendChild(prevBtn);
    }

    container.appendChild(navigation);

    var results = getResultsText();
    var resultTextarea = document.createElement(`TEXTAREA`);
    resultTextarea.cols = 29;
    resultTextarea.rows = bestAlgorithm.length + 4;
    resultTextarea.setAttribute("readonly", "");
    resultTextarea.className = `result-textarea`;
    resultTextarea.innerHTML = results;

    var submitBtn = document.createElement(`button`);
    submitBtn.className = `${cssPrefix}-submit-btn`;
    submitBtn.appendChild(document.createTextNode(`${textResources.submit_results}`));
    submitBtn.setAttribute("id", "id-submit-button");
    submitBtn.setAttribute("onclick", `sendResults()`);

    container.appendChild(submitBtn);
    var thanksText = document.createElement("div");
    thanksText.setAttribute("id", "thanks-text");
    container.appendChild(thanksText);
    container.appendChild(resultTextarea);
}

function sendResults() {
    var answer = '';
    bestAlgorithm.forEach(function (item, index) {
        if (item > 0) {
            answer = `${answer}&entry.${fs_JSON[index].entry}=${fs_JSON[index].files[item - 1]}`;
        }
    });
    answer = `${answer}&entry.${platformEntry}=${isMobile ? 'Mobile' : 'Desktop'}`;
    answer = `${answer}&entry.${versionEntry}=${versionVal}`;
    var queryString = `/formResponse?${answer}&submit=SUBMIT`;

    var url = `https://docs.google.com/forms/d/e/${formId}${queryString}`;

    var opts = {
        method: "POST",
        mode: "no-cors", // apparently Google will only submit a form if "mode" is "no-cors"
        redirect: "follow",
        referrer: "no-referrer"
    };
    console.log(url);

    fetch(url, opts)

    var submitBtn = document.getElementById("id-submit-button");
    submitBtn.removeAttribute("onclick");
    submitBtn.className = `${cssPrefix}-submit-btn-disabled`;
    var thanksText = document.getElementById("thanks-text");
    thanksText.className = `${cssPrefix}-thanks-text`;
    var textNode = document.createTextNode(`${textResources.thanks_text}`);
    thanksText.appendChild(textNode);
}

function selectAlgo(index) {
    gesturableImg.setImage(images[index - 1]);

    var slideIndex = bestAlgorithm[datasetIndex];
    if (isMobile) {
        var algos = document.getElementsByClassName("mobile-algo");
        var n = algos.length;
        if (slideIndex != 0) {
            algos[n - slideIndex].className = algos[slideIndex - 1].className.replace(" mobile-algo-active", "");
            algos[n - slideIndex].setAttribute("onclick", `selectSlide(${slideIndex})`);
        }
        algos[n - index].className += " mobile-algo-active";
        algos[n - index].removeAttribute("onclick");
    } else {
        var algos = document.getElementsByClassName("desktop-algo");
        if (slideIndex != 0) {
            algos[slideIndex - 1].className = algos[slideIndex - 1].className.replace(" desktop-algo-active", "");
            algos[slideIndex - 1].setAttribute("onclick", `selectSlide(${slideIndex})`);
        }
        algos[index - 1].className += " desktop-algo-active";
        algos[index - 1].removeAttribute("onclick");
    }
}
