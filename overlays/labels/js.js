var labels = document.getElementById("labels");

var labelIcons = {
    "ViewerCount": "👁",
    "Viewers": "👁",
    "FollowerCount": "✧",
    "NewFollowerCount": "✧",
    "SubsCount": "⚝",
    "SubCount": "⚝",
    "BitsCount": "✦",
    "RaidCount": "☄",
    "ChatUserCount": "❂",
    "HostCount": "✺"
};

function getIcon(type) {
    return labelIcons[type] || "✦";
}

var displaySettings = "{DisplaySetting}";
var displayRotationSeconds = {DisplayRotationSeconds};
var displayRotationIndex = 0;

function rotateLabelDisplay()
{
    if (displayRotationIndex >= labels.children.length)
    {
        displayRotationIndex = 0;
    }
    
    for (const labelDisplay of labels.children) {
        labelDisplay.style.visibility = 'hidden';
    }
    
    let label = labels.children[displayRotationIndex];
    label.style.visibility = 'visible';
    
    displayRotationIndex++;
    
    setTimeout(() => { rotateLabelDisplay(); }, (displayRotationSeconds * 1000));
}

function add(data)
{
    let existing = document.getElementById(data.Type);
    if (!existing) {
        let template = document.getElementById("labeldisplay");
        let clone = template.content.cloneNode(true);

        let labelTextContent = clone.querySelector(".labelTextContent");
        labelTextContent.id = data.Type;
        labelTextContent.innerHTML = data.Format;

        let labelIcon = clone.querySelector(".label-icon");
        let iconSource = labelTextContent.querySelector(".label-ico");
        if (iconSource) {
            labelIcon.textContent = iconSource.textContent;
            iconSource.remove();
        } else {
            labelIcon.textContent = getIcon(data.Type);
        }

        let displayBox = clone.querySelector(".labelDisplay");
        displayBox.style.visibility = "visible";

        labels.appendChild(clone);

        if (labels.children.length === 1 && displaySettings === "RotatingDisplays") {
            rotateLabelDisplay();
        }
    }
}

sendParentMessage({ Type: "WidgetLoaded", ID: "{ID}" });