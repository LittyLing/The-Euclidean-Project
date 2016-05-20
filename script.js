// webpage scripts
// main function
$(document).ready(function() {
    // different page display mechanics (only for codecademy)
    $(".pageContentWrapper").css("display", "none");
    $(".pageCurrent").css("display", "block");
    
    // navigation button click
    $("#navigationButtons li a").click(function() {
        if ($(".pageContentWrapper." + $(this).attr("class")).css("display") === "none") {
            $(".pageContentWrapper").css("display", "none");
            $(".pageContentWrapper." + $(this).attr("class")).css("display", "block");
            $("#navigationButtons .active").removeClass("active");
            $(this).addClass("active");
            
            // setting up constructor page (only for codecademy)
            if ($(this).hasClass("constructor")) {
                setCanvas();
                resize();
            }
        }
    });
    
    // redirect button click
    $("#homeContentWrapper .button.redirectButton").click(function() {
        $(".pageContentWrapper").css("display", "none");
        $(".pageContentWrapper." + jQuery(this).attr('class').split(' ')[0]).css("display", "block");
        $("#navigationButtons li a").removeClass("active");
        $("#navigationButtons li a." + jQuery(this).attr('class').split(' ')[0]).addClass("active");
    });
    
    // footer link click
    $("footer .links a:not(.icon)").click(function() {
        $(".pageContentWrapper").css("display", "none");
        $(".pageContentWrapper." + $(this).attr("class")).css("display", "block");
        
        // setting up constructor page (only for codecademy)
        if ($(this).hasClass("constructor")) {
            setCanvas();
            resize();
        }
    });
    
    function setCanvas() {
        // sets header navbar top to header bottom
        $("#navigationButtons").offset({top: $("header").offset().top + $("header").height() + 20});
        // sets canvas button container left to canvas container left
        $("#canvasButtonContainerSide").css("left", $("#canvasContainer").offset().left + 15);
    };
    
    setCanvas();
    
    // header navbar animation
    var animating = false;
    
    // open and close functions
    function closeHeaderNavbar() {
        animating = true;
        // close menu
        $("#navigationButtons").css("left", "-80%");
        // animating menu icon
        $(".menuIconDiv:nth-child(1)").css("-webkit-transform", "rotate(45deg)");
        $(".menuIconDiv:nth-child(1)").css("-ms-transform", "rotate(0deg)");
        $(".menuIconDiv:nth-child(1)").css("-moz-transform", "rotate(0deg)");
        $(".menuIconDiv:nth-child(1)").css("-o-transform", "rotate(0deg)");
        $(".menuIconDiv:nth-child(1)").css("transform", "rotate(0deg)");
        $(".menuIconDiv:nth-child(3)").css("-webkit-transform", "rotate(0deg)");
        $(".menuIconDiv:nth-child(3)").css("-ms-transform", "rotate(0deg)");
        $(".menuIconDiv:nth-child(3)").css("-moz-transform", "rotate(0deg)");
        $(".menuIconDiv:nth-child(3)").css("-o-transform", "rotate(0deg)");
        $(".menuIconDiv:nth-child(3)").css("transform", "rotate(0deg)");
        setTimeout(function() {
            $(".menuIconDiv:nth-child(1)").css("margin-top", "5px");
            $(".menuIconDiv:nth-child(2)").css("margin-top", "5px"); 
            $(".menuIconDiv:nth-child(3)").css("margin-top", "5px");
            $(".menuIconDiv:nth-child(2)").css("visibility", "visible");
            animating = false;
        }, 500);
    };
    
    function openHeaderNavbar() {
        animating = true;
        // open menu
        $("#navigationButtons").css("left", "0%");
        // animating menu icon
        $(".menuIconDiv:nth-child(2)").css("visibility", "hidden");
        $(".menuIconDiv:nth-child(1)").css("margin-top", "13px");
        $(".menuIconDiv:nth-child(2)").css("margin-top", "-3px");
        $(".menuIconDiv:nth-child(3)").css("margin-top", "-3px");
        setTimeout(function() {
            $(".menuIconDiv:nth-child(1)").css("-webkit-transform", "rotate(45deg)");
            $(".menuIconDiv:nth-child(1)").css("-ms-transform", "rotate(45deg)");
            $(".menuIconDiv:nth-child(1)").css("-moz-transform", "rotate(45deg)");
            $(".menuIconDiv:nth-child(1)").css("-o-transform", "rotate(45deg)");
            $(".menuIconDiv:nth-child(1)").css("transform", "rotate(45deg)");
            $(".menuIconDiv:nth-child(3)").css("-webkit-transform", "rotate(-45deg)");
            $(".menuIconDiv:nth-child(3)").css("-ms-transform", "rotate(-45deg)");
            $(".menuIconDiv:nth-child(3)").css("-moz-transform", "rotate(-45deg)");
            $(".menuIconDiv:nth-child(3)").css("-o-transform", "rotate(-45deg)");
            $(".menuIconDiv:nth-child(3)").css("transform", "rotate(-45deg)");
            animating = false;
        }, 500);
    };
    
    $("header nav .menuIcon").click(function() {
        // toggling header navbar class on click
        $("#navigationButtons").toggleClass("open");
        // toggling header navbar class on click
        $("header nav .menuIcon").toggleClass("active");
        
        if (!$("header nav .menuIcon").hasClass("active") && !$("#navigationButtons").hasClass("open") && !animating) {
            // close menu
            closeHeaderNavbar();
        } else if ($("header nav .menuIcon").hasClass("active") && $("#navigationButtons").hasClass("open") && !animating) {
            // open menu
            openHeaderNavbar();
        }
    });
    
    // header navbar animation upon document click
    $("#contentWrapper, footer").click(function() {
        if ($("header nav .menuIcon").hasClass("active") && $("#navigationButtons").hasClass("open") && !animating) {
            // toggling header navbar class on click
            $("#navigationButtons").toggleClass("open");
            // toggling header navbar class on click
            $("header nav .menuIcon").toggleClass("active");
            closeHeaderNavbar();
        }
    });
    
    // menu taskbar animation
    $("#canvasContainer .menuIcon").click(function() {
        // toggling menu taskbar class on click
        $("#canvasButtonContainerSide").toggleClass("open");
        // toggling menu button class on click
        $("#canvasContainer .menuIcon").toggleClass("active");
        
        if (!$("#canvasContainer .menuIcon").hasClass("active") && !$("#canvasButtonContainerSide").hasClass("open")) {
            // close menu
            // sets canvas button container height to 0
            $("#canvasButtonContainerSide").height("0px");
            // animates menu button arrow
            $("#canvasContainer .menuIcon span").html("▼");
        } else {
            // open menu
            // sets canvas button container height to canvas height
            $("#canvasButtonContainerSide").height($("#canvas").height());
            // animates menu button arrow
            $("#canvasContainer .menuIcon span").html("▲");
        }
    });
});

// canvas scripts
// paced graphics function
(function() {
    var requestAnimationFrame = window.requestAnimationFrame || 
    window.mozRequestAnimationFrame || 
    window.msRequestAnimatinFrame || 
    window.webkitRequestAnimationFrame;
    window.requestAnimationFrame = requestAnimationFrame;
})();

// defining canvas and ctx variables
var canvas = document.getElementById("canvas");
var ctx = canvas.getContext("2d");

// canvas settings
// canvas dimensions and scale
canvas.width = $("#canvas").width();
canvas.height = $("#canvas").height();
var canvasOriginalWidth = canvas.width;

// canvas mode
var mode = "move";
var construct = "";

// mobile settings
var mobile = false;
if( /Android|webOS|iPhone|iPad|iPod|BlackBerry|IEMobile|Opera Mini/i.test(navigator.userAgent) ) {
    mobile = true;
}
    
// webpage responsiveness on resize
function resize() {
    // changing canvas scale
    canvas.width = $("#canvas").width();
    canvas.height = $("#canvas").height();
    
    // sets canvas button container left to canvas container left
    $("#canvasButtonContainerSide").css("left", $("#canvasContainer").offset().left + 15);
};

window.addEventListener("resize", resize);

// mouse object
var mouse = {
    x: 0,
    y: 0,
    // array of past mouse coordinates
    pX: [],
    pY: [],
    // coordinates of a near collinear point on an object mouse collides with
    colliding: null,
    // object that mouse clicks and moves
    clickSelect: null,
    // object mouse hovers over
    objectHover: null,
    // array of 2 objects mouse hovers over
    twoObjectHover: [],
    // array of objects mouse has selected
    select: [],
    // array of past objects mouse has selected
    pSelect: [],
    // array of 2 objects mouse hovers over
    twoObjectHoverSelect: [],
    // array of past 2 objects mouse hovers over
    pTwoObjectHoverSelect: [],
    // mouse activity
    draw: false,
    // mobile states
    touch: false,
    // mouse cursor type
    cursor: "default"
};

// mouse position for desktop function
function mousePositionDesktop(e) {
    if (!mobile) {
        // setting mouse coordinates 
        mouse.x = e.x - canvas.getBoundingClientRect().left;
        mouse.y = e.y - canvas.getBoundingClientRect().top;
        
        // mouse coordinates updated based on canvas settings
        mouse.x = (mouse.x - canvas.width/2)/(canvas.clientWidth/canvas.width);
        mouse.y = (-1 * (mouse.y - canvas.height/2))/(canvas.clientHeight/canvas.height);
    }
};
    
canvas.addEventListener("mousemove", mousePositionDesktop);

// mouse position for mobile function
function mousePositionMobile(e) {
        // setting mouse coordinates 
        var x = e.touches[0].clientX - canvas.getBoundingClientRect().left;
        var y = e.touches[0].clientY - canvas.getBoundingClientRect().top;
        
        // mouse coordinates updated based on canvas settings
        x = (x - canvas.width/2)/(canvas.clientWidth/canvas.width);
        y = (-1 * (y - canvas.height/2))/(canvas.clientHeight/canvas.height);
    return {
        x: x,
        y: y
    };
};

// point objects array
var points = [];

// point object creator
function Point(x, y, specialClass, base) {
    this.x = x;
    this.y = y;
    this.radius = 10;
    this.hidden = false;
    this.show = true;
    this.class = "point";
    this.specialClass = specialClass;
    // array of objects relied on for position
    this.base = base;
    this.color = "black";
};

// point methods
// mouse collision with point detection
Point.prototype.mouseOver = function(mouseX, mouseY) {
    //returns whether mouse is less than two radii away from point
    return Math.sqrt(Math.pow(mouseX - this.x, 2) + Math.pow(mouseY - this.y, 2)) <= this.radius * 2;
};
    
// point set collinear to line
Point.prototype.setCollinearLine = function(line) {
    // distance between point and point on a line
    var pointLineLengthX = line.point2.x - this.x;
    var pointLineLengthY = line.point2.y - this.y;
    // horizontal and vertical distance of line
    var lineLengthX = line.point2.x - line.point1.x;
    var lineLengthY = line.point2.y - line.point1.y;
    this.lengthRatioX = pointLineLengthX/lineLengthX;
    this.lengthRatioY = pointLineLengthY/lineLengthY;
};

// point set collinear to circle
Point.prototype.setCollinearCircle = function(circle) {
    // angle formed between point, circle center, and horizontal through circle center
    this.circleAngle = Math.atan2(this.y - circle.center.y, this.x - circle.center.x);
};
    
// point set to intersection of two lines
Point.prototype.setIntersectionLines = function(line1, line2) {
    this.x = intersectionLines(line1, line2).x;
    this.y = intersectionLines(line1, line2).y;
    this.specialClass = "intersection1";
    this.base = [line1, line2];
};
    
// point set to intersection of two circles
Point.prototype.setIntersectionCircles = function(currentX, currentY, circle1, circle2) {
    // coordinates of all potential intersection points
    var x1 = intersectionCircles(circle1, circle2)[0].x;
    var y1 = intersectionCircles(circle1, circle2)[0].y;
    var x2 = intersectionCircles(circle1, circle2)[1].x;
    var y2 = intersectionCircles(circle1, circle2)[1].y;
    
    // sets point coordinates to the closest of the two possible intersection points
    if (Math.sqrt(Math.pow(currentX - x1, 2) + Math.pow(currentY - y1, 2)) < Math.sqrt(Math.pow(currentX - x2, 2) + Math.pow(currentY - y2, 2))) {
        this.x = x1;
        this.y = y1;
        this.specialClass ="intersection1"; 
        this.base = [circle1, circle2];
    } else {
        this.x = x2;
        this.y = y2;
        this.specialClass ="intersection2"; 
        this.base = [circle1, circle2];
    }
};
    
// point set to intersection of line and circle
Point.prototype.setIntersectionLineCircle = function(currentX, currentY, line, circle) {
    // coordinates of first intersection points
    var x1 = intersectionLineCircle(line, circle)[0].x;
    var y1 = intersectionLineCircle(line, circle)[0].y;
    
    this.x = x1;
    this.y = y1;
    this.base = [line, circle];
    this.specialClass = "intersection1"; 
    
    // if there are two intersection points then point coordinates are set to the closest of the two possible intersection points
    if (intersectionLineCircle(line, circle).length > 1) {
        var x2 = intersectionLineCircle(line, circle)[1].x;
        var y2 = intersectionLineCircle(line, circle)[1].y;
        if (Math.sqrt(Math.pow(currentX - x1, 2) + Math.pow(currentY - y1, 2)) < Math.sqrt(Math.pow(currentX - x2, 2) + Math.pow(currentY - y2, 2))) {
            this.x = x1;
            this.y = y1;
        } else {
            this.x = x2;
            this.y = y2;
            this.specialClass = "intersection2";
        }
    }
};

// line segment objects array
var lineSegments = [];

// line segment object creator
function LineSegment(x1, y1, x2, y2, specialClass, base) {
    // endpoints are part of point class
    this.point1 = new Point(x1, y1, null, null);
    this.point2 = new Point(x2, y2, null, null);
    points.push(this.point1, this.point2);
    this.slope = (this.point1.y - this.point2.y)/(this.point1.x - this.point2.x);
    this.hidden = false;
    this.show = true;
    this.class = "lineSegment";
    this.specialClass = specialClass;
    // array of objects relied on for position
    this.base = base;
    this.color = "black";
};

// line segment methods
// mouse collision with line segment detection
LineSegment.prototype.mouseOver = function(mouseX, mouseY) {
    // different tests are used for lines with slopes less than and greater than 1
    if (Math.abs(this.slope) > 1) {
        // tests whether mouse y is between both endpoints' y
        return ((mouseY >= this.point1.y + this.point1.radius * 2 && 
        mouseY <= this.point2.y - this.point2.radius * 2) || 
        (mouseY >= this.point2.y + this.point2.radius * 2 && 
        mouseY <= this.point1.y - this.point1.radius * 2)) &&
        // tests whether mouse x is between the x of two collinear points offset by 20
        (mouseX <= ((mouseY - this.point1.y)/this.slope + this.point1.x + 20) 
        && mouseX >= ((mouseY - this.point1.y)/this.slope + this.point1.x - 20));
    } else {
        // tests whether mouse x is between both endpoints' x
        return ((mouseX >= this.point1.x + this.point1.radius * 2 && 
        mouseX <= this.point2.x - this.point2.radius * 2) || 
        (mouseX >= this.point2.x + this.point2.radius * 2 && 
        mouseX <= this.point1.x - this.point1.radius * 2)) && 
        // tests whether mouse y is between the y of two collinear points offset by 20
        (mouseY <= ((this.slope * (mouseX - this.point1.x) + this.point1.y) + 20) && 
        mouseY >= ((this.slope * (mouseX - this.point1.x) + this.point1.y) - 20));
    }
};
    
// lines objects array
var lines = [];

// lines object creator
function Line(x1, y1, x2, y2, specialClass, base) {
    // line segment properties are inherited 
    LineSegment.call(this, x1, y1, x2, y2, specialClass, base);
    // new points are part of point class
    if (!isFinite(this.slope)) {
        // new points are vertically aligned
        this.point3 = new Point(x1, -canvas.height * 2, null, null);
        this.point4 = new Point(x1, canvas.height * 2, null, null);
    } else {
        // new points are collinear
        this.point3 = new Point(-canvas.width * 2, this.slope * (-canvas.width * 2 - x1) + y1, null, null);
        this.point4 = new Point(canvas.width * 2, this.slope * (canvas.width * 2 - x1) + y1, null, null);
    }
    points.push(this.point3, this.point4);
    // class reset to line
    this.class = "line";
};
 
// line methods  
// mouse collision with line detection
Line.prototype.mouseOver = function(mouseX, mouseY) {
    // different tests are used for lines with slopes less than and greater than 1
    if (Math.abs(this.slope) > 1) {
        // tests whether mouse y is between both endpoints' y (endpoints are outer points 3 and 4)
        return ((mouseY >= this.point3.y && mouseY <= this.point4.y) || (mouseY >= this.point4.y && mouseY <= this.point3.y)) && 
        // tests whether mouse x is between the x of two collinear points offset by 20
        (mouseX <= ((mouseY - this.point3.y)/this.slope + this.point3.x + 20) && 
        mouseX >= ((mouseY - this.point3.y)/this.slope + this.point3.x - 20)) && 
        // tests whether mouse is greater than 2 radii away from points 1 and 2
        Math.sqrt(Math.pow(mouseX - this.point1.x, 2) + Math.pow(mouseY - this.point1.y, 2)) > this.point1.radius * 2 && 
        Math.sqrt(Math.pow(mouseX - this.point2.x, 2) + Math.pow(mouseY - this.point2.y, 2)) > this.point2.radius * 2;
    } else {
        // tests whether mouse x is between both endpoints' x (endpoints are outer points 3 and 4)
        return ((mouseX >= this.point3.x && mouseX <= this.point4.x) || (mouseX >= this.point4.x && mouseX <= this.point3.x)) && 
        // tests whether mouse y is between the y of two collinear points offset by 20
        (mouseY <= ((this.slope * (mouseX - this.point3.x) + this.point3.y) + 20) && 
        mouseY >= ((this.slope * (mouseX - this.point3.x) + this.point3.y) - 20)) &&
        // tests whether mouse is greater than 2 radii away from points 1 and 2
        Math.sqrt(Math.pow(mouseX - this.point1.x, 2) + Math.pow(mouseY - this.point1.y, 2)) > this.point1.radius * 2 && 
        Math.sqrt(Math.pow(mouseX - this.point2.x, 2) + Math.pow(mouseY - this.point2.y, 2)) > this.point2.radius * 2;
    }
};
    
// circle objects array
var circles = [];

// circle object creator
function Circle(x, y, radius, specialClass, base) {
    // center is part of point class
    this.center = new Point(x, y, null, null);
    points.push(this.center);
    this.radius = radius;
    this.hidden = false;
    this.show = true;
    this.class = "circle";
    this.specialClass = specialClass;
    // array of objects relied on for position and size
    this.base = base;
    this.color = "black";
};
 
// circle methods
// mouse collision with circle detection
Circle.prototype.mouseOver = function(mouseX, mouseY) {
    //returns whether mouse is less than one radius plus 10 units and greater than one radius minus 10 units away from circle 
    return Math.sqrt(Math.pow(mouseX - this.center.x, 2) + Math.pow(mouseY - this.center.y, 2)) >= this.radius - 10 && 
    Math.sqrt(Math.pow(mouseX - this.center.x, 2) + Math.pow(mouseY - this.center.y, 2)) <= this.radius + 10;
};
    
// label objects array
var labels = [];

// label object creator
function Label(x, y, text, specialClass, base) {
    this.x = x;
    this.y = y;
    this.width = 60;
    this.height = 30;
    this.hidden = false;
    this.show = true;
    this.class = "label";
    this.specialClass = specialClass;
    // objects relied on for position and text
    this.base = base;
    this.text = text;
    // text color
    this.color = "black";
};

// label methods
// mouse collision with label detection
Label.prototype.mouseOver = function(mouseX, mouseY) {
    //returns whether mouse is in between label x and label x plus label width and label y and label y plus height
    //mouse y is inverted due to negative canvas y scale
    return mouseX > this.x - 10 && mouseX < this.x + this.width + 5 && 
    mouseY * -1 > this.y - 22.5 && mouseY * -1 < this.y - 22.5 + this.height;
};
    
// inks objects array
var inks = [];
    
// ink object creator
// an ink is a single point particle made from a marker tool
function Ink(x, y) {
    this.x = x;
    this.y = y;
    this.radius = 5;
    this.color = "black";
};

// ink methods
// mouse collision with ink detection
Ink.prototype.mouseOver = function(ink1, mouseX, mouseY) {
    // two inks form an abstract line segment with slope
    var ink2 = this;
    var slope = (ink2.y - ink1.y)/(ink2.x - ink1.x);
    
    // coordinates of each point on the abstract line segment stored
    for (var i = 0; i < Math.abs(ink2.x - ink1.x); i++) {
        if (ink2.x > ink1.x) {
            var x = ink1.x + i;
            var y = slope * (x - ink1.x) + ink1.y;
        } else {
            var x = ink2.x + i;
            var y = slope * (x - ink2.x) + ink2.y;
        }
        
        if (Math.sqrt(Math.pow(mouseX - x, 2) + Math.pow(mouseY - y, 2)) < ink1.radius * 2) {
            // returns true if mouse is less than two radii away from a point
            return true;   
        }
    }
};

// stroke objects array
var strokes = [];

// stroke object creator
// a stroke is a set of inks made with a stroke of the marker tool
function Stroke(inks) {
    // array of ink objects in each stroke
    this.inks = inks;
    // each ink's horizontal and vertical distance from the first ink is stored
    for (var i = 0; i < inks.length; i++) {
        var ink = inks[i];
        ink.changeX = ink.x - inks[0].x;
        ink.changeY = ink.y - inks[0].y;
    }
    this.hidden = false;
    this.show = true;
    this.class = "stroke";
    this.color = "black";
};

// stroke methods
// mouse collision with stroke detection
Stroke.prototype.mouseOver = function(mouseX, mouseY) {
    // tests if each ink is colliding with mouse
    for (var i = 0; i < this.inks.length; i++) {
        var ink2 = this.inks[i];
        
        // stores previous ink of the array if it exists
        if (i !== 0) {
            var ink1 = this.inks[i - 1];
        } else {
            var ink1 = ink2;
        }
        
        if (ink2.mouseOver(ink1, mouseX, mouseY)) {
            // returns true if ink is colliding with mouse
            return true;
        }
    }
};

// canvas button mechanics
$(document).ready(function() {
    // display of a button on the menu taskbar is toggled when the heading of the button section is clicked
    $(".canvasButtonListContainer:not(.show)").css("max-height", "0px");
    $(".canvasButtonListContainer:not(.show)").css("opacity", "0");
    $(".canvasButtonListContainer:not(.show)").hide();
    
    $(".canvasButton span.button").click(function() {
        // calss of clicked span element
        var spanClass = jQuery(this).attr('class').split(' ')[0];
        
        if ($(".canvasButtonListContainer." + spanClass).hasClass("show")) {
            // close button set
            $(".canvasButtonListContainer." + spanClass).removeClass("show");
            $(".canvasButtonListContainer." + spanClass).css("max-height", "0px");
            $(".canvasButtonListContainer." + spanClass).css("opacity", "0");
            setTimeout(function() {
                $(".canvasButtonListContainer." + spanClass).hide();
            }, 1000);
        } else {
            // open button set
            $(".canvasButtonListContainer." + spanClass).addClass("show");
            $(".canvasButtonListContainer." + spanClass).show();
            setTimeout(function() {
                $(".canvasButtonListContainer." + spanClass).css("max-height", "1000px");
                $(".canvasButtonListContainer." + spanClass).css("opacity", "1");
            }, 100);
        }
        
        // cheap method for rendering bug (height flickers) when opening any canvas button list containers after construct canvas button list container
        if ($(".canvasButtonListContainer.actions").hasClass("show") || $(".canvasButtonListContainer.constructFree").hasClass("show") || $(".canvasButtonListContainer.construct").hasClass("show")) {
            $(".canvasButtonListContainer.find").css("margin-top", "2px");
            $(".canvasButtonListContainer.measure").css("margin-top", "3px");
        } else {
            $(".canvasButtonListContainer.find").css("margin-top", "5px");
            $(".canvasButtonListContainer.measure").css("margin-top", "5px");
        }
    });
    
    // mode and interface text change on canvas click
    $(".canvasButton li a").click(function() {
        mode = $(this).attr("id");
        $(".canvasButton .active").removeClass("active");
        $(this).addClass("active");
        mouse.select = [];
        mouse.pSelect = [];
        
        if (mode === "clear") {
            // clears canvas and all stored variables
            $("#canvasInterface span").html("Canvas cleared!");
            points = [];
            lineSegments = [];
            lines = [];
            circles = [];
            labels = [];
            inks = [];
            strokes = [];
            mouse.pX = [];
            mouse.pY = [];
            mouse.colliding = null;
            mouse.objectHover = null;
            mouse.twoObjectHover = [];
            mouse.clickSelect = [];
            mouse.twoObjectHoverSelect = [];
            mouse.pTwoObjectHoverSelect = [];
            mouse.drawing = false;
        } else if (mode === "delete") {
            $("#canvasInterface span").html("Click on things to delete them!");
        } else if (mode === "hideShow") {
            $("#canvasInterface span").html("Click on things to hide or show them!");
        } else if (mode === "move") {
            $("#canvasInterface span").html("Click, drag, then release on the canvas to move or resize anything!");
        } else if (mode === "label") {
            $("#canvasInterface span").html("Click on any object to label it!");  
        } else if (mode === "pointFree") {
            $("#canvasInterface span").html("Click anywhere on the canvas to add a point!");
        } else if (mode === "lineSegmentFree") {
            $("#canvasInterface span").html("Click, drag, then release on the canvas to draw a line segment!");
        } else if (mode === "lineFree") {
            $("#canvasInterface span").html("Click, drag, then release on the canvas to draw a line!");
        } else if (mode === "circleFree") {
            $("#canvasInterface span").html("Click, drag, then release on the canvas to draw a circle with any radius!");
        } else if (mode === "marker") {
            $("#canvasInterface span").html("Click and drag on the canvas to draw freely!");
        } else if (mode === "lineSegmentSelect") {
            $("#canvasInterface span").html("Click on two selectable points, lines, or circles to draw a line segment between them");
        } else if (mode === "lineSelect") {
            $("#canvasInterface span").html("Click on two selectable points, lines, or circles to draw a line through them");
        } else if (mode === "circleSelect") {
            $("#canvasInterface span").html("Click on a center, then click on two points that will be the radius length!");
        } else if (mode === "compass") {
            $("#canvasInterface span").html("Click on a center, then a circle, or line segment, or two points for the circle radius!");
        } else if (mode === "midpoint") {
            $("#canvasInterface span").html("Click on two points or a line segment to find the midpoint between them!");
        } else if (mode === "perpendicular") {
            $("#canvasInterface span").html("Click on a point and a line to construct a perpendicular line!");
            mouse.select = [];
        } else if (mode === "angleBisector") {
            $("#canvasInterface span").html("Click on 3 points, the vertex being the second point, to construct an angle bisector!");
        } else if (mode === "intersection") {
            $("#canvasInterface span").html("Click on two line segments or circles and the intersection points will be displayed!");
        } else if (mode === "findLength") {
            $("#canvasInterface span").html("Click on two points or a line segment to measure their length!");
        } else if (mode === "findAngle") {
            $("#canvasInterface span").html("Click on 3 points, the vertex being the second point, to measure the angle!");
        }
    });
});

// canvas math functions
// midpoint of line segment calculator
function midpointLineSegment(lineSegment) {
    return {
        x: (lineSegment.point1.x + lineSegment.point2.x)/2, 
        y: (lineSegment.point1.y + lineSegment.point2.y)/2, 
    };
};

// midpoint of two points calculator
function midpointPoints(point1, point2) {
    return {
        x: (point1.x + point2.x)/2,
        y: (point1.y + point2.y)/2,
    };
};

// perpendicular of a line calculator
function perpendicular(point, line) {
    if (!isFinite(line.slope)) {
        // returns horizontal line if line is vertical
        return {
            x1: -canvas.width * 1.5,
            y1: point.y,
            x2: canvas.width * 1.5,
            y2: point.y,
        };
    } else {
        // returns line with negative recipricol slope 
        var b = point.y - (1/-line.slope) * point.x;
        return {
            x1: point.x,
            y1: point.y,
            x2: canvas.width * 1.5,
            y2: (1/-line.slope) * canvas.width * 1.5 + b,
        };
    }
};

// parallel of a line calculator
function parallel(point, line) {
    if (!isFinite(line.slope)) {
        // returns vertical line if line is vertical
        return {
            x1: point.x,
            y1: canvas.height * 1.5,
            x2: point.x,
            y2: -canvas.height * 1.5,
        };
    } else {
        // returns line with same slope
        var b = point.y - line.slope * point.x;
        return {
            x1: point.x,
            y1: point.y,
            x2: canvas.width * 1.5,
            y2: line.slope * canvas.width * 1.5 + b,
        };
    }
};

// angle bisector of an angle calculator
// credit: https://www.youtube.com/watch?v=3BkY-UWrQ-Q
function angleBisector(point1, vertex, point2) {
    // distances between vertex and other points of angle
    var distance1 = Math.sqrt(Math.pow(point1.x - vertex.x, 2) + Math.pow(point1.y - vertex.y, 2));
    var distance2 = Math.sqrt(Math.pow(point2.x - vertex.x, 2) + Math.pow(point2.y - vertex.y, 2));
    
    return {
        x1: vertex.x,
        y1: vertex.y,
        x2: (distance1 * point2.x + distance2 * point1.x)/(distance1 + distance2),
        y2: (distance1 * point2.y + distance2 * point1.y)/(distance1 + distance2),
    };
};

// intersection of lines calculator
function intersectionLines(line1, line2) {
    // different variables set whether lines are vertical or not
    if (!isFinite(line1.slope)) {
        // x is set to x of vertical line and y is set to y of collinear point with value of x on nonvertical line
        var x = line1.point1.x;
        var y = line2.slope * (x - line2.point1.x) + line2.point1.y;
    } else if (!isFinite(line2.slope)) {
        // x is set to x of vertical line and y is set to y of collinear point with value of x on nonvertical line
        var x = line2.point1.x;
        var y = line1.slope * (x - line1.point1.x) + line1.point1.y;
    } else {
        // x is set to common x value of two lines and y is set to y of collinear point with value of x on line 1
        // equation derived from solving for x with two point slope line equations
        var x = (line1.slope * line1.point1.x - line2.slope * line2.point1.x - line1.point1.y + line2.point1.y)/(line1.slope - line2.slope);
        var y = line1.slope * (x - line1.point1.x) + line1.point1.y;
    }
    
    if ((((x >= line1.point1.x && x <= line1.point2.x) || 
        (x >= line1.point2.x && x <= line1.point1.x)) && 
        ((y >= line1.point1.y && y <= line1.point2.y) || 
        (y >= line1.point2.y && y <= line1.point1.y)) && 
        line1.class === "lineSegment") && 
        (((x >= line2.point1.x && x <= line2.point2.x) || 
        (x >= line2.point2.x && x <= line2.point1.x)) && 
        ((y >= line2.point1.y && y <= line2.point2.y) || 
        (y >= line2.point2.y && y <= line2.point1.y)) && 
        line2.class === "lineSegment")) {
        // returns coordinates if both lines are line segments and point is in between both endpoints of both line segments
        return {
            x: x,
            y: y,
        };
    } else if (line1.class === "line" && line2.class === "line" && line1.slope !== line2.slope) {
        // returns coordinates if both lines are lines and are not parallel
        return {
            x: x,
            y: y,
        };
    } else if (
        ((((x >= line1.point1.x && x <= line1.point2.x) || 
        (x >= line1.point2.x && x <= line1.point1.x)) && 
        ((y >= line1.point1.y && y <= line1.point2.y) || 
        (y >= line1.point2.y && y <= line1.point1.y)) && 
        line1.class === "lineSegment") && 
        line2.class === "line") || 
        ((((x >= line2.point1.x && x <= line2.point2.x) || 
        (x >= line2.point2.x && x <= line2.point1.x)) && 
        ((y >= line2.point1.y && y <= line2.point2.y) || 
        (y >= line2.point2.y && y <= line2.point1.y)) && 
        line2.class === "lineSegment") && 
        line1.class === "line")) {
        // returns coordinates if point is in between the line segment endpoints
        return {
            x: x,
            y: y,
        };
    } else {
        //returns null if none of the cases are met
        return null;
    }
};

// intersection of circles calculator
// credit: http://csharphelper.com/blog/2014/09/determine-where-two-circles-intersect-in-c/
function intersectionCircles(circle1, circle2) {
    // distance between centers of two circles
    var distance = Math.sqrt(Math.pow(circle1.center.x - circle2.center.x, 2) + Math.pow(circle1.center.y - circle2.center.y, 2));
    
    if (distance <= circle1.radius + circle2.radius && distance >= Math.abs(circle1.radius - circle2.radius)) {
        // returns set of coordinates if distance is less than the sum of the two circle radii (meaning circles intersect) and distance is greater than the absolute value of difference of the two circle radii (meaning the circles are not inside each other)
        // check http://csharphelper.com/blog/2014/09/determine-where-two-circles-intersect-in-c/ for explanation
        var a = (Math.pow(circle1.radius, 2) - Math.pow(circle2.radius, 2) + Math.pow(distance, 2))/(2 * distance);
        var h = Math.sqrt(Math.pow(circle1.radius, 2) - Math.pow(a, 2));
        
        var x = circle1.center.x + a * (circle2.center.x - circle1.center.x)/distance;
        var y = circle1.center.y + a * (circle2.center.y - circle1.center.y)/distance;
        
        return [
            {
            x: x + h * (circle2.center.y - circle1.center.y)/distance,
            y: y - h * (circle2.center.x - circle1.center.x)/distance,
            },
            {
            x: x - h * (circle2.center.y - circle1.center.y)/distance,
            y: y + h * (circle2.center.x - circle1.center.x)/distance,
            },
        ];
    } else {
        return null;
    }    
};

// intersection of line and circle calculator
// credit: http://csharphelper.com/blog/2014/09/determine-where-a-line-intersects-a-circle-in-c/
function intersectionLineCircle(line, circle) {
    if (!isFinite(line.slope)) {
        // returns coordinates if line is vertical
        // x set to x value of point on line
        var x = line.point1.x;
        // y set to y values of points on circle with the same x value
        var y1 = Math.sqrt(Math.pow(circle.radius, 2) - Math.pow(x - circle.center.x, 2)) + circle.center.y;
        var y2 = -Math.sqrt(Math.pow(circle.radius, 2) - Math.pow(x - circle.center.x, 2)) + circle.center.y;
        return [
            {
            x: x,
            y: y1,
            },
            {
            x: x,
            y: y2,
            },
        ];
    } else {
        // horizontal and vertical distance of line points
        var distanceX = line.point1.x - line.point2.x;
        var distanceY = line.point1.y - line.point2.y;
        
        // check http://csharphelper.com/blog/2014/09/determine-where-a-line-intersects-a-circle-in-c/ for explanation
        var a = Math.pow(distanceX, 2) + Math.pow(distanceY, 2);
        var b = 2 * (distanceX * (line.point1.x - circle.center.x) + distanceY * (line.point1.y - circle.center.y));
        var c = Math.pow(line.point1.x - circle.center.x, 2) + Math.pow(line.point1.y - circle.center.y, 2) - Math.pow(circle.radius, 2);
        
        var discriminant = Math.pow(b, 2) - 4 * a * c;
        
        if ((a <= 0.00000000000001 || discriminant < 0) || 
            (Math.sqrt(Math.pow(line.point1.x - circle.center.x, 2) + Math.pow(line.point1.y - circle.center.y, 2)) < circle.radius && 
            Math.sqrt(Math.pow(line.point2.x - circle.center.x, 2) + Math.pow(line.point2.y - circle.center.y, 2)) < circle.radius && 
            line.class === "lineSegment")) {
            // returns null if a or discriminant is too small or line is a line segment and is too short to intersect the circle
            return null;
        } else if (discriminant === 0) {
            //returns one set of coordinates
            // check http://csharphelper.com/blog/2014/09/determine-where-a-line-intersects-a-circle-in-c/ for explanation
            var t = -b/(2 * a);
            var x = line.point1.x + t * distanceX;
            var y = line.point1.y + t * distanceY;
            
            return [
                {
                x: x,
                y: y,
                }
            ];
        } else {
            // check http://csharphelper.com/blog/2014/09/determine-where-a-line-intersects-a-circle-in-c/ for explanation
            var t1 = (-b + Math.sqrt(discriminant))/(2 * a);
            var t2 = (-b - Math.sqrt(discriminant))/(2 * a);
            
            // all possible coordinates
            var x1 = line.point1.x + t1 * distanceX;
            var y1 = line.point1.y + t1 * distanceY;
            var x2 = line.point1.x + t2 * distanceX;
            var y2 = line.point1.y + t2 * distanceY;
            
            // array of points to return
            var returnPoints = [];
            
            if (line.class === "lineSegment") {
            // tests if points are collinear with line segment before returning them
                if (((x1 >= line.point1.x && x1 <= line.point2.x) || 
                    (x1 >= line.point2.x && x1 <= line.point1.x)) && 
                    ((y1 >= line.point1.y && y1 <= line.point2.y) || 
                    (y1 >= line.point2.y && y1 <= line.point1.y))) {
                    // adds point to returnPoints if point is collinear with line segment
                    var point1 = {
                        x: x1,
                        y: y1,
                    };
                    returnPoints.push(point1);
                }
                
                if (((x2 >= line.point1.x && x2 <= line.point2.x) || 
                    (x2 >= line.point2.x && x2 <= line.point1.x)) && 
                    ((y2 >= line.point1.y && y2 <= line.point2.y) || 
                    (y2 >= line.point2.y && y2 <= line.point1.y))) {
                    // adds point to returnPoints if point is collinear with line segment
                    var point2 = {
                        x: x2,
                        y: y2,
                    };
                    returnPoints.push(point2);
                }
                
                if (returnPoints.length < 1) {
                    return null;    
                } else {
                    return returnPoints;
                }
            } else if (line.class === "line") {
                // returns all sets of coordinates
                return [
                    {
                    x: x1,
                    y: y1,
                    },
                    {
                    x: x2,
                    y: y2,
                    },
                ];
            }
        }
    }
};

// length of line segment calculator
function findLengthLineSegment(lineSegment) {
    // returns distance between two endpoints of line segment
    return Math.sqrt(Math.pow(lineSegment.point1.x - lineSegment.point2.x, 2) + Math.pow(lineSegment.point1.y - lineSegment.point2.y, 2));
};

// length between two points calculator
function findLengthPoints(point1, point2) {
    return Math.sqrt(Math.pow(point1.x - point2.x, 2) + Math.pow(point1.y - point2.y, 2));
};

// angle measure calculator
function findAngle(point1, vertex, point2) {
    // distance between points and vertex and between points
    var distance1 = Math.sqrt(Math.pow(point1.x - vertex.x, 2) + Math.pow(point1.y - vertex.y, 2));
    var distance2 = Math.sqrt(Math.pow(point2.x - vertex.x, 2) + Math.pow(point2.y - vertex.y, 2));
    var distance3 = Math.sqrt(Math.pow(point1.x - point2.x, 2) + Math.pow(point1.y - point2.y, 2));
    
    // returns angle between three points in degrees
    // equation derived from law of cosines
    return (180/Math.PI) * Math.acos((Math.pow(distance1, 2) + Math.pow(distance2, 2) - Math.pow(distance3, 2))/(2 * distance1 * distance2));
};

// canvas functions
// hide/show or delete function
function hideShowDelete(mode) {
    // line segments
    for (var i = lineSegments.length - 1; i >= 0; i--) {
        var lineSegment = lineSegments[i];
        
        if (mode === "delete" && lineSegment.mouseOver(mouse.x, mouse.y) && lineSegment.show) {
            lineSegments.splice(i, 1);
            $("#canvasInterface span").html("Line segment deleted!");
        } else if (mode === "hideShow" && lineSegment.mouseOver(mouse.x, mouse.y)) {
            if (lineSegment.hidden) {
                lineSegment.hidden = false;
                $("#canvasInterface span").html("Line segment shown!");
            } else {
                lineSegment.hidden = true;
                $("#canvasInterface span").html("Line segment hidden!");
            }
        }
    }
        
    // lines
    for (var i = lines.length - 1; i >= 0; i--) {
        var line = lines[i];
        
        if (mode === "delete" && line.mouseOver(mouse.x, mouse.y) && line.show) {
            lines.splice(i, 1);
            $("#canvasInterface span").html("Line deleted!");
        } else if (mode === "hideShow" && line.mouseOver(mouse.x, mouse.y)) {
            if (line.hidden) {
                line.hidden = false;
                $("#canvasInterface span").html("Line shown!");
            } else {
                line.hidden = true;
                $("#canvasInterface span").html("Line hidden!");
            }
        }
    }
        
    // circles
    for (var i = circles.length - 1; i >= 0; i--) {
        var circle = circles[i];
        
        if (mode === "delete" && circle.mouseOver(mouse.x, mouse.y) && circle.show) {
            circles.splice(i, 1);
            $("#canvasInterface span").html("Circle deleted!");
        } else if (mode === "hideShow" && circle.mouseOver(mouse.x, mouse.y)) {
            if (circle.hidden) {
                circle.hidden = false;
                $("#canvasInterface span").html("Circle shown!");
            } else {
                circle.hidden = true;
                $("#canvasInterface span").html("Circle hidden!");
            }
        }
    }
        
    // points
    for (var i = points.length - 1; i >= 0; i--) {
        var point = points[i];
        
        if (mode === "delete" && point.mouseOver(mouse.x, mouse.y) && point.show) {
            points.splice(i, 1);
            $("#canvasInterface span").html("Point deleted!");
        } else if (mode === "hideShow" && point.mouseOver(mouse.x, mouse.y)) {
            if (point.hidden) {
                point.hidden = false;
                $("#canvasInterface span").html("Point shown!");
            } else {
                point.hidden = true;
                $("#canvasInterface span").html("Point hidden!");
            }
        }
    }
        
    // labels
    for (var i = labels.length - 1; i >= 0; i--) {
        var label = labels[i];
        
        if (mode === "delete" && label.mouseOver(mouse.x, mouse.y) && label.show) {
            labels.splice(i, 1);
            $("#canvasInterface span").html("Label deleted!");
        } else if (mode === "hideShow" && label.mouseOver(mouse.x, mouse.y)) {
            if (label.hidden) {
                label.hidden = false;
                $("#canvasInterface span").html("Label shown!");
            } else {
                label.hidden = true;
                $("#canvasInterface span").html("Label hidden!");
            }
        }
    }
        
    // strokes
    for (var i = 0; i < strokes.length; i++) {
        var stroke = strokes[i];
        
        if (mode === "delete" && stroke.mouseOver(mouse.x, mouse.y) && stroke.show) {
            strokes.splice(i, 1);
            $("#canvasInterface span").html("Stroke deleted!");
        } else if (mode === "hideShow" && stroke.mouseOver(mouse.x, mouse.y)) {
            if (stroke.hidden) {
                stroke.hidden = false;
                $("#canvasInterface span").html("Stroke shown!");
            } else {
                stroke.hidden = true;
                $("#canvasInterface span").html("Stroke hidden!");
            }
        }
    }
            
    mouse.colliding = null;
    mouse.objectHover = null;
};

// snapping points function
function snapPoints(object) {
    if (mouse.pTwoObjectHoverSelect.length === 2) {
        // sets point 1 to intersection of two past hovered objects
        // sets point 1 to point on object depending on its class
        if (object.class === "lineSegment" || object.class === "line") {
            var point1 = object.point1;
        } else if (object.class === "circle") {
            if (mouse.twoObjectHoverSelect.length === 2 || mouse.select.length === 1) {
                // sets point 1 to copy of object center if other object or objects are selected
                var center = object.center;
                points.push(new Point(center.x, center.y, center.specialClass, center.base));
                var point1 = points[points.length - 1];
            } else {
                // sets point 1 to object center if no other objects are selected
                var point1 = object.center;
            }
        }
        
        // two past hovered objects
        var object1 = mouse.pTwoObjectHoverSelect[0];
        var object2 = mouse.pTwoObjectHoverSelect[1];
        
        if ((object1.class === "line" || object1.class === "lineSegment") && (object2.class === "line" || object2.class === "lineSegment") && intersectionLines(object1, object2) !== null) {
            // sets point 1 to intersection of two past hovered lines
            point1.setIntersectionLines(object1, object2);
        } else if (object1.class === "circle" && object2.class === "circle" && (intersectionCircles(object1, object2) !== null)) {
            // sets point 1 to intersection of two past hovered circles
            point1.setIntersectionCircles(point1.x, point1.y, object1, object2);
        } else {
            // sets point 1 to intersection of past hovered line and circle
            if (object1.class === "circle" && intersectionLineCircle(object2, object1) !== null) {
                point1.setIntersectionLineCircle(point1.x, point1.y, object2, object1);
            } else if (object2.class === "circle" && intersectionLineCircle(object1, object2) !== null) {
                point1.setIntersectionLineCircle(point1.x, point1.y, object1, object2);
            }
        }
    } else if (mouse.pSelect.length === 1) {
        // sets point 1 to point on object depending on its class
        if (object.class === "lineSegment" || object.class === "line") {
            var point1 = object.point1;
        }  else if (object.class === "circle") {
            if (mouse.select.length === 1 || mouse.twoObjectHoverSelect.length === 2) {
                // sets point 1 to copy of object center if other object or objects are selected
                var center = object.center;
                points.push(new Point(center.x, center.y, center.specialClass, center.base));
                var point1 = points[points.length - 1];
            } else {
                // sets point 1 to object center if no other objects are selected
                var point1 = object.center;    
            }
        }
        
        point1.base = [mouse.pSelect[0]];
        
        if (mouse.pSelect[0].class === "lineSegment" || mouse.pSelect[0].class === "line") {
            // sets point 1 collinear with selected line
            point1.specialClass = "collinear";
            var line = point1.base[0];
            point1.setCollinearLine(line);
        } else if (mouse.pSelect[0].class === "circle") {
            // sets point 1 collinear with selected circle
            point1.specialClass = "collinear";
            var circle = point1.base[0];
            point1.setCollinearCircle(circle);
        } else if (mouse.pSelect[0].class === "point") {
            // sets point 1 to selected point
            point1.specialClass = "select";
        }
    }

    if (mouse.twoObjectHoverSelect.length === 2) {
        // sets point 2 to intersection of two currently hovered objects
        // sets point 2 to point on object depending on its class
        if (object.class === "lineSegment" || object.class === "line") {
            var point2 = object.point2;
        } else if (object.class === "circle") {
            if (mouse.pSelect.length !== 1) {
                // sets point 1 to copy of object center if no object was previously selected
                var center = object.center;
                points.push(new Point(center.x, center.y, center.specialClass, center.base));
                var point1 = points[points.length - 1];
            }
            // sets point 2 to colliding point
            points.push(new Point(mouse.colliding.x, mouse.colliding.y, null, null));
            var point2 = points[points.length - 1];
        } else if (object.class === "point") {
            // sets point 2 to object
            var point2 = object;    
        }
        
        // two currently hovered objects
        var object1 = mouse.twoObjectHoverSelect[0];
        var object2 = mouse.twoObjectHoverSelect[1];
        
        if ((object1.class === "line" || object1.class === "lineSegment") && (object2.class === "line" || object2.class === "lineSegment") && intersectionLines(object1, object2) !== null) {
            // sets point 2 to intersection of two currently hovered lines
            point2.setIntersectionLines(object1, object2);
            if (object.class === "circle") {
                // resets circle special class and bases
                object.specialClass = "circlePoints";
                object.base = [point1, point1, point2];
            }
        } else if (object1.class === "circle" && object2.class === "circle" && (intersectionCircles(object1, object2) !== null)) {
            // sets point 2 to intersection of two currently hovered circles
            point2.setIntersectionCircles(mouse.x, mouse.y, object1, object2);
            if (object.class === "circle") {
                // resets circle special class and bases
                object.specialClass = "circlePoints";
                object.base = [point1, point1, point2];
            }
        } else {
            // sets point 2 to intersection of currently hovered line and circle
            if (object1.class === "circle" && intersectionLineCircle(object2, object1) !== null) {
                point2.setIntersectionLineCircle(mouse.x, mouse.y, object2, object1);
                if (object.class === "circle") {
                    // resets circle special class and bases
                    object.specialClass = "circlePoints";
                    object.base = [point1, point1, point2];
                }
            } else if (object2.class === "circle" && intersectionLineCircle(object1, object2) !== null) {
                point2.setIntersectionLineCircle(mouse.x, mouse.y, object1, object2);
                if (object.class === "circle") {
                    // resets circle special class and bases
                    object.specialClass = "circlePoints";
                    object.base = [point1, point1, point2];
                }
            }
        }
    } else if (mouse.select.length === 1) {
        // sets point 2 to point on object depending on its class
        if (object.class === "lineSegment" || object.class === "line") {
            var point2 = object.point2;
        } else if (object.class === "circle") {
            if (mouse.pSelect.length !== 1) {
                // sets point 1 to copy of object center if no object was previously selected
                var center = object.center;
                points.push(new Point(center.x, center.y, center.specialClass, center.base));
                var point1 = points[points.length - 1];
            }
            // sets point 2 to colliding point
            points.push(new Point(mouse.colliding.x, mouse.colliding.y, null, null));
            var point2 = points[points.length - 1];
        } else if (object.class === "point") {
            // sets point 2 to object
            var point2 = object;
        }
        
        point2.base = [mouse.select[0]];
        
        if (mouse.select[0].class === "lineSegment" || mouse.select[0].class === "line") {
            // sets point 2 collinear with selected line
            point2.specialClass = "collinear";
            var line = point2.base[0];
            point2.setCollinearLine(line);
            if (object.class === "circle") {
                // resets circle special class and bases
                object.specialClass = "circlePoints";
                object.base = [point1, point1, point2];
            }
        } else if (mouse.select[0].class === "circle") {
            // sets point 2 collinear with selected circle
            point2.specialClass = "collinear";
            var circle = point2.base[0];
            point2.setCollinearCircle(circle);
            if (object.class === "circle") {
                // resets circle special class and bases
                object.specialClass = "circlePoints";
                object.base = [point1, point1, point2];    
            }
        } else if (mouse.select[0].class === "point") {
            // sets point 2 to selected point
            point2.specialClass = "select";
            if (object.class === "circle") {
                // resets circle special class and bases
                object.specialClass = "circlePoints";
                object.base = [point1, point1, point2];    
            }
        }
    }
};

// canvas drawing
function canvasUserDown() {
    // setting mouse settings
    mouse.draw = true;
    mouse.pX.push(mouse.x);
    mouse.pY.push(mouse.y);
    
    // setting canvas settings
    ctx.save();
    ctx.translate(canvas.width/2, canvas.height/2);
    ctx.scale(1, -1);
    
    if (mode === "delete" || mode === "hideShow") {
        // hiding/showing and deleting objects
        hideShowDelete(mode);
    } else if (mode === "move" && mouse.objectHover !== null && !mouse.objectHover.hidden && !(mouse.objectHover.class === "lineSegment" || mouse.objectHover.class === "line")) {
        // moving objects
        mouse.clickSelect = mouse.objectHover;
        if (mouse.clickSelect.class !== "stroke") {
            if (mouse.clickSelect.specialClass !== "select" && mouse.clickSelect.class !== "label") {
                // removes object special class for free movement
                mouse.clickSelect.specialClass = null;
            }
            
            if (mouse.clickSelect.class !== "label") {
                mouse.pX.push(mouse.colliding.x);
                mouse.pY.push(mouse.colliding.y);
            }
        }
        
        $("#canvasInterface span").html("Object selected");
    } else if (mode === "label" && mouse.objectHover !== null && !mouse.objectHover.hidden && mouse.objectHover.class !== "label") {
        // labelling objects
        if (mouse.objectHover.class === "point") {
            // labelling point
            var label = prompt("Enter a label for the point:");
            if (label !== null && label.trim().length > 0) {
                // creates new label if label is not empty or spaces
                labels.push(new Label(mouse.objectHover.x + 20, -mouse.objectHover.y, label, "labelPoint", [mouse.objectHover]));
                $("#canvasInterface span").html("Point labeled!");
            } else {
                $("#canvasInterface span").html("Insufficient label given!"); 
            }
        } else if (mouse.objectHover.class === "lineSegment") {
            // labelling line segment
            var label = prompt("Enter a label for the line segment:");
            if (label !== null && label.trim().length > 0) {
                // creates new label if label is not empty or spaces
                labels.push(new Label((mouse.objectHover.point1.x + mouse.objectHover.point2.x)/2 + 20, -(mouse.objectHover.point1.y + mouse.objectHover.point2.y)/2, label, "labelLineSegment", [mouse.objectHover]));
                $("#canvasInterface span").html("Line segment labeled!"); 
            } else {
                $("#canvasInterface span").html("Insufficient label given!"); 
            }
        } else if (mouse.objectHover.class === "line") {
            // labelling line
            var label = prompt("Enter a label for the line:");
            if (label !== null && label.trim().length > 0) {
                // creates new label if label is not empty or spaces
                labels.push(new Label((mouse.objectHover.point1.x + mouse.objectHover.point2.x)/2 + 20, -(mouse.objectHover.point1.y + mouse.objectHover.point2.y)/2, label, "labelLine", [mouse.objectHover]));
                $("#canvasInterface span").html("Line labeled!"); 
            } else {
                $("#canvasInterface span").html("Insufficient label given!"); 
            }
        } else if (mouse.objectHover.class === "circle") {
            // labelling circle
            var label = prompt("Enter a label for the circle:");
            if (label !== null && label.trim().length > 0) {
                // creates new label if label is not empty or spaces
                labels.push(new Label(mouse.objectHover.center.x + 20, -mouse.objectHover.center.y, label, "labelCircle", [mouse.objectHover]));
                $("#canvasInterface span").html("Circle labeled!"); 
            } else {
                $("#canvasInterface span").html("Insufficient label given!"); 
            }
        }
    } else if (mode === "pointFree") {
        // creating point
        if (mouse.colliding !== null && mouse.objectHover !== null && !mouse.objectHover.hidden) {
            // creates new point collinear with a selected object or at the intersection of two objects
            if (mouse.objectHover.class !== "label") {
                mouse.select.push(mouse.objectHover);
            }
            
            if (mouse.twoObjectHover.length === 2) {
                mouse.twoObjectHoverSelect.push(mouse.twoObjectHover[0], mouse.twoObjectHover[1]);
            }
            
            points.push(new Point(mouse.colliding.x, mouse.colliding.y, "collinear", [mouse.objectHover]));
            
            snapPoints(points[points.length - 1]);
        } else {
            // creates new point
            points.push(new Point(mouse.pX[mouse.pX.length - 1], mouse.pY[mouse.pY.length - 1], null, null));
        }
        
        mouse.select = [];
        $("#canvasInterface span").html("Point placed!");
    } else if (mode === "lineSegmentFree" || mode === "lineFree" || mode === "circleFree") {
        // creating line segment, line, and circle
        if (mouse.colliding !== null && mouse.objectHover !== null) {
            // sets mouse pX and pY to mouse colliding x and colliding y
            if (mouse.twoObjectHover.length === 2) {
                // stores two selected objects
                mouse.pTwoObjectHoverSelect.push(mouse.twoObjectHover[0], mouse.twoObjectHover[1]);
            }
            
            if (mouse.objectHover.class !== "label") {
                // stores selected object
                mouse.pSelect.push(mouse.objectHover);
            }
            mouse.pX.push(mouse.colliding.x);
            mouse.pY.push(mouse.colliding.y);
        }
    } else if (mode === "marker") {
        // creating stroke
        // clears inks and adds new ink object with mouse coordinates
        inks = [];
        inks.push(new Ink(mouse.x, mouse.y));
    } /*DISCONTINUED AND REMOVED else if (mode === "lineSegmentSelect" && mouse.objectSelect !== null && mouse.objectSelect.class === "point" && !mouse.objectSelect.hidden) {
        mouse.select.push(mouse.objectSelect);
        $("#canvasInterface span").html(mouse.select.length + " points selected!");
        if (mouse.select.length === 2) {
            lineSegments.push(new LineSegment(mouse.select[0].x, mouse.select[0].y, mouse.select[1].x, mouse.select[1].y, "select", [mouse.select[0], mouse.select[1]]));
            mouse.select = [];
            $("#canvasInterface span").html("Line segment constructed!");
        }
    } else if (mode === "lineSelect" && mouse.objectSelect !== null && mouse.objectSelect.class === "point" && !mouse.objectSelect.hidden) {
        mouse.select.push(mouse.objectSelect);
        $("#canvasInterface span").html(mouse.select.length + " points selected!");
        if (mouse.select.length === 2) {
            if (mouse.select[0].y !== mouse.select[1].y) {
                lines.push(new Line(mouse.select[0].x, mouse.select[0].y, mouse.select[1].x, mouse.select[1].y,  "select", [mouse.select[0], mouse.select[1]]));
                $("#canvasInterface span").html("Line constructed!");
            }
            mouse.select = [];
        }
    } else if (mode === "circleSelect" && mouse.objectSelect !== null && mouse.objectSelect.class === "point" && !mouse.objectSelect.hidden) {
        mouse.select.push(mouse.objectSelect);
        $("#canvasInterface span").html(mouse.select.length + " points selected!");
        if (mouse.select.length === 3) {
            circles.push(new Circle(mouse.select[0].x, mouse.select[0].y, Math.sqrt(Math.pow(mouse.select[1].x - mouse.select[2].x, 2) + Math.pow(mouse.select[1].y - mouse.select[2].y, 2)), "select", [mouse.select[0], mouse.select[1], mouse.select[2]]));
            mouse.select = [];
            $("#canvasInterface span").html("Circle constructed!");
        }
    }*/ else if (mode === "compass" && mouse.objectHover !== null && !mouse.objectHover.hidden) {
        // creating congruent circles
        if (mouse.objectHover.class !== "label") {
            mouse.select.push(mouse.objectHover);
            $("#canvasInterface span").html(mouse.select.length + " objects selected!");
            if (mouse.select.length === 2 && mouse.select[1].class !== "point") {
                // point and line segment or circle selected
                var object1 = mouse.select[0];
                var object2 = mouse.select[1];
                
                if (object1.class === "point" && object2.class === "lineSegment") {
                    var center = object1;
                    var lineSegment = object2;
                    
                    // creates new circle centered at selected point with radius of selected line segment
                    circles.push(new Circle(center.x, center.y, findLengthLineSegment(lineSegment), "circleLineSegment", [center, lineSegment]));
                    $("#canvasInterface span").html("Circle constructed!");
                } else if (object1.class === "point" && object2.class === "circle") {
                    var center = object1;
                    var circle = object2;
                    
                    // creates new circle centered at selected point with radius of selected circle
                    circles.push(new Circle(center.x, center.y, circle.radius, "circleCircle", [center, circle]));
                } else {
                    $("#canvasInterface span").html("Selected objects do not meet parameters!");
                }
                
                mouse.select = [];
            } else if (mouse.select.length >= 3) {
                // three points selected
                var object1 = mouse.select[0];
                var object2 = mouse.select[1];
                var object3 = mouse.select[2];
                
                if (object1.class === "point" && object2.class === "point" && object3.class === "point") {
                    var center = object1;
                    var point1 = object2;
                    var point2 = object3;
                    
                    // creates new circle centered at first selected point with radius distance between second and third selected points
                    circles.push(new Circle(center.x, center.y, findLengthPoints(point1, point2), "circlePoints", [center, point1, point2]));
                } else {
                    $("#canvasInterface span").html("Selected objects do not meet parameters!");
                }
                
                mouse.select = [];
            }
        } else {
            // selected objects cannot be used
            $("#canvasInterface span").html("Selected objects do not meet parameters!");
            mouse.select = [];
        }
    } else if (mode === "midpoint" && mouse.objectHover !== null && !mouse.objectHover.hidden) {
        // creating midpoints
        if (mouse.objectHover.class !== "label") {
            mouse.select.push(mouse.colliding);
            $("#canvasInterface span").html(mouse.select.length + " points selected!");
            if (mouse.select.length >= 1 && mouse.objectHover.class === "lineSegment") {
                // creates new midpoint of selected line segment
                points.push(new Point(midpointLineSegment(mouse.objectHover).x, midpointLineSegment(mouse.objectHover).y, "midpointLineSegment", [mouse.objectHover]));
                
                $("#canvasInterface span").html("Midpoint constructed!");
                mouse.select = [];
            } else if (mouse.select.length >= 2 && mouse.select[0].class === "point" && mouse.select[1].class === "point") {
                // creates new line segment between selected points
                lineSegments.push(new LineSegment(mouse.select[0].x, mouse.select[0].y, mouse.select[1].x, mouse.select[1].y, "select", [mouse.select[0], mouse.select[1]]));
                // creates new midpoint of selected points
                points.push(new Point(midpointPoints(mouse.select[0], mouse.select[1]).x, midpointPoints(mouse.select[0], mouse.select[1]).y, "midpointPoints", [mouse.select[0], mouse.select[1]]));
    
                $("#canvasInterface span").html("Midpoint constructed!");
                mouse.select = [];
            } else if (mouse.select.length >= 2) {
                // selected objects cannot be used
                $("#canvasInterface span").html("Selected objects do not meet parameters!");
                mouse.select = [];
            }
        } else {
            // selected objects cannot be used
            $("#canvasInterface span").html("Selected objects do not meet parameters!");
            mouse.select = [];
        }
    } else if (mode === "perpendicular" && mouse.objectHover !== null && !mouse.objectHover.hidden) {
        // creating perpendicular lines
        if (mouse.objectHover !== "label") {
            mouse.select.push(mouse.objectHover);
            $("#canvasInterface span").html(mouse.select.length + " objects selected!");
            if (mouse.select.length >= 2) {
                var object1 = mouse.select[0];
                var object2 = mouse.select[1];
                
                if (object1.class === "point" && (object2.class === "lineSegment" || object2.class === "line")) {
                    // creates new line through selected point perpendicular to selected line
                    lines.push(new Line(perpendicular(object1, object2).x1, perpendicular(object1, object2).y1, perpendicular(object1, object2).x2, perpendicular(object1, object2).y2, "perpendicular", [object1, object2]));
                    
                    $("#canvasInterface span").html("Perpendicular line constructed!");
                } else if (object2.class === "point" && (object1.class === "lineSegment" || object1.class === "line")) {
                    // creates new line through selected point perpendicular to selected line
                    lines.push(new Line(perpendicular(object2, object1).x1, perpendicular(object2, object1).y1, perpendicular(object2, object1).x2, perpendicular(object2, object1).y2, "perpendicular", [object2, object1]));
                    
                    $("#canvasInterface span").html("Perpendicular line constructed!");
                } else {
                    // selected objects cannot be used
                    $("#canvasInterface span").html("Selected objects do not meet parameters!");
                }
                
                mouse.select = [];
            }
        } else {
            // selected objects cannot be used
            $("#canvasInterface span").html("Selected objects do not meet parameters!");
            mouse.select = [];
        }
    } else if (mode === "parallel" && mouse.objectHover !== null && !mouse.objectHover.hidden) {
        // creating parallel lines
        if (mouse.objectHover.class !== "label") {
            mouse.select.push(mouse.objectHover);
            $("#canvasInterface span").html(mouse.select.length + " objects selected!");
            if (mouse.select.length >= 2) {
                var object1 = mouse.select[0];
                var object2 = mouse.select[1];
                
                if (object1.class === "point" && (object2.class === "lineSegment" || object2.class === "line")) {
                    // creates new line through selected point parallel to selected line
                    lines.push(new Line(parallel(object1, object2).x1, parallel(object1, object2).y1, parallel(object1, object2).x2, parallel(object1, object2).y2, "parallel", [object1, object2]));
                    
                    $("#canvasInterface span").html("Parallel line constructed!");
                } else if (object2.class === "point" && (object1.class === "lineSegment" || object1.class === "line")) {
                    // creates new line through selected point parallel to selected line
                    lines.push(new Line(parallel(object2, object1).x1, parallel(object2, object1).y1, parallel(object2, object1).x2, parallel(object2, object1).y2, "parallel", [object2, object1]));
                    
                    $("#canvasInterface span").html("Parallel line constructed!");
                } else {
                    // selected objects cannot be used
                    $("#canvasInterface span").html("Selected objects do not meet parameters!");
                }
                
                mouse.select = [];
            }
        } else {
            // selected objects cannot be used
            $("#canvasInterface span").html("Selected objects do not meet parameters!");
            mouse.select = [];
        }
    } else if (mode === "angleBisector" && mouse.colliding !== null) {
        // creating angle bisectors
        if (mouse.objectHover !== "label") {
            mouse.select.push(mouse.objectHover);
            $("#canvasInterface span").html(mouse.select.length + " points selected!");
            if (mouse.select.length >= 3) {
                if (mouse.select[0] !== mouse.select[1] && mouse.select[1] !== mouse.select[2] && mouse.select[0] !== mouse.select[2]) {
                    // creates new line segments between selected points
                    lineSegments.push(new LineSegment(mouse.select[0].x, mouse.select[0].y, mouse.select[1].x, mouse.select[1].y, "select", [mouse.select[0], mouse.select[1]]));
                    lineSegments.push(new LineSegment(mouse.select[2].x, mouse.select[2].y, mouse.select[1].x, mouse.select[1].y, "select", [mouse.select[2], lineSegments[lineSegments.length - 1].point2]));
                
                    // creates new line that bisects the selected angle
                    lines.push(new Line(angleBisector(mouse.select[0], mouse.select[1], mouse.select[2]).x1, angleBisector(mouse.select[0], mouse.select[1], mouse.select[2]).y1, angleBisector(mouse.select[0], mouse.select[1], mouse.select[2]).x2, angleBisector(mouse.select[0], mouse.select[1], mouse.select[2]).y2, "angleBisector", [mouse.select[0], mouse.select[1], mouse.select[2]]));
                    
                    $("#canvasInterface span").html("Angle bisector constructed!");
                } else {
                    // selected objects cannot be used
                    $("#canvasInterface span").html("Selected objects do not meet parameters!");
                }
                
                mouse.select = [];
            }
        } else {
            // selected objects cannot be used
            $("#canvasInterface span").html("Selected objects do not meet parameters!");
            mouse.select = [];
        }
    } else if (mode === "intersection" && mouse.objectHover !== null && !mouse.objectHover.hidden) {
        // creating intersection points
        if (mouse.objectHover.class !== "point" && mouse.objectHover.class !== "label") {
            mouse.select.push(mouse.objectHover);
            $("#canvasInterface span").html(mouse.select.length + " objects selected!");
            if (mouse.select.length >= 2) {
                var object1 = mouse.select[0];
                var object2 = mouse.select[1];
                
                if ((object1.class === "lineSegment" || object1.class === "line") && (object2.class === "lineSegment" || object2.class === "line")) {
                    if (intersectionLines(object1, object2) !== null) {
                        // creates new point at the intersection of two selected lines
                        points.push(new Point(intersectionLines(object1, object2).x, intersectionLines(object1, object2).y, "intersection1", [object1, object2]));
                        
                        $("#canvasInterface span").html("Intersection points found!");
                    } else {
                        // selected objects do not intersect
                        $("#canvasInterface span").html("No intersection points found!");
                    }
                } else if (object1.class === "circle" && object2.class === "circle") {
                    if (intersectionCircles(object1, object2) !== null) {
                        // creates new points at the intersections of two selected circles
                        points.push(new Point(intersectionCircles(object1, object2)[0].x, intersectionCircles(object1, object2)[0].y, "intersection1", [object1, object2]));
                        points.push(new Point(intersectionCircles(object1, object2)[1].x, intersectionCircles(object1, object2)[1].y, "intersection2", [object1, object2]));
                        $("#canvasInterface span").html("Intersection points found!");
                    } else {
                        // selected objects do not intersect
                        $("#canvasInterface span").html("No intersection points found!");    
                    }
                } else {
                    if (object1.class === "circle") {
                        // object 1 is a circle and object 2 is a line
                        if (intersectionLineCircle(object2, object1) !== null) {
                            // creates new point at first intersection of selected line and circle
                            points.push(new Point(intersectionLineCircle(object2, object1)[0].x, intersectionLineCircle(object2, object1)[0].y, "intersection1", [object2, object1]));
                            $("#canvasInterface span").html("Intersection points found!");
                            if (intersectionLineCircle(object2, object1).length > 1) {
                                // creates new point at second intersection of selected line and circle
                                points.push(new Point(intersectionLineCircle(object2, object1)[1].x, intersectionLineCircle(object2, object1)[1].y, "intersection2", [object2, object1]));
                            }
                        }
                    } else {
                        // object 1 is a line and object 2 is a circle
                        if (intersectionLineCircle(object1, object2) !== null) {
                            // creates new point at first intersection of selected line and circle
                            points.push(new Point(intersectionLineCircle(object1, object2)[0].x, intersectionLineCircle(object1, object2)[0].y, "intersection1", [object1, object2]));
                            $("#canvasInterface span").html("Intersection points found!");
                            if (intersectionLineCircle(object1, object2).length > 1) {
                                // creates new point at second intersection of selected line and circle
                                points.push(new Point(intersectionLineCircle(object1, object2)[1].x, intersectionLineCircle(object1, object2)[1].y, "intersection2", [object1, object2]));
                            }
                        }
                    }
                }
                
                mouse.select = [];
            }
        } else {
            // selected objects cannot be used
            $("#canvasInterface span").html("Selected objects do not meet parameters!");
            mouse.select = [];
        }
    } else if (mode === "findLength" && mouse.objectHover !== null && !mouse.objectHover.hidden) {
        // measuring length
        if (mouse.objectHover.class !== "label") {
            mouse.select.push(mouse.objectHover);
            $("#canvasInterface span").html(mouse.select.length + " points selected!");
            if (mouse.select.length >= 1 && mouse.objectHover.class === "lineSegment") {
                // creates new label with length of selected line segment
                labels.push(new Label((mouse.objectHover.point1.x + mouse.objectHover.point2.x)/2, -(mouse.objectHover.point1.y + mouse.objectHover.point2.y)/2, findLengthLineSegment(mouse.objectHover) + " u", "lengthLineSegment", [mouse.objectHover])); 
                
                $("#canvasInterface span").html("Length found!");
                mouse.select = [];
            } else if (mouse.select.length >= 2 && mouse.select[0].class === "point" && mouse.select[1].class === "point") {
                // creates new line segments between selected points
                lineSegments.push(new LineSegment(mouse.select[0].x, mouse.select[0].y, mouse.select[1].x, mouse.select[1].y, "select", [mouse.select[0], mouse.select[1]]));
                // creates new label with length between selected points
                labels.push(new Label((mouse.select[0].x + mouse.select[1].x)/2, -(mouse.select[0].y + mouse.select[1].y)/2, findLengthPoints(mouse.select[0], mouse.select[1]) + " u", "lengthPoints", [mouse.select[0], mouse.select[1]]));
                
                $("#canvasInterface span").html("Length found!");
                mouse.select = [];
            } else if (mouse.select.length >= 2) {
                // selected objects cannot be used
                $("#canvasInterface span").html("Selected objects do not meet parameters!");
                mouse.select = [];
            }
        } else {
            // selected objects cannot be used
            $("#canvasInterface span").html("Selected objects do not meet parameters!");
            mouse.select = [];
        }
    } else if (mode === "findAngle" && mouse.objectHover !== null && !mouse.objectHover.hidden) {
        // measuring angles
        if (mouse.objectHover.class === "point") {
            mouse.select.push(mouse.colliding);
            $("#canvasInterface span").html(mouse.select.length + " points selected!");
            if (mouse.select.length >= 3) {
                // creates new line segments between selected points
                lineSegments.push(new LineSegment(mouse.select[0].x, mouse.select[0].y, mouse.select[1].x, mouse.select[1].y, "select", [mouse.select[0], mouse.select[1]]));
                lineSegments.push(new LineSegment(mouse.select[2].x, mouse.select[2].y, mouse.select[1].x, mouse.select[1].y, "select", [mouse.select[2], lineSegments[lineSegments.length - 1].point2]));
                
                // creates new label with angle measure between selected points
                labels.push(new Label(mouse.select[1].x, -mouse.select[1].y, findAngle(mouse.select[0], mouse.select[1], mouse.select[2]) + "°", "angle", [mouse.select[0], mouse.select[1], mouse.select[2]]));
                
                $("#canvasInterface span").html("Angle measure found!");
                mouse.select = [];
            }
        } else {
            // selected objects cannot be used
            $("#canvasInterface span").html("Selected objects do not meet parameters!");
            mouse.select = [];
        }
    }
    
    ctx.restore();
};
    
function canvasUserMove() {
    ctx.save();
    ctx.translate(canvas.width/2, canvas.height/2);
    ctx.scale(1, -1);
    
    if (mode === "move" && mouse.clickSelect !== null) {
        // moving objects
        mouse.draw = false;
        var object = mouse.clickSelect;
        
        if (object.class === "point") {
            // sets point x and y to mouse x and y
            object.x = mouse.x;
            object.y = mouse.y;
        } else if (object.class === "circle") {
            // sets circle radius to distance between circle center and mouse coordinates
            object.radius = Math.sqrt(Math.pow(mouse.x - object.center.x, 2) + Math.pow(mouse.y - object.center.y, 2));
        } else if (object.class === "label") {
            // sets label x and y (centered) to mouse x and y
            object.x = mouse.x - object.width/2;
            object.y = -mouse.y + object.height/4;
        } else if (object.class === "stroke") {
            // sets first ink x and y of stroke to mouse x and y
            object.inks[0].x = mouse.x;
            object.inks[0].y = mouse.y;
        }
    } else if (mode === "marker") {
        // temporarily rendering strokes
        // creates new ink with mouse x and y
        inks.push(new Ink(mouse.x, mouse.y));
        
        ctx.fillStyle = "white";
        ctx.fillRect(-canvas.width/2, -canvas.height/2, canvas.width, canvas.height);
        
        // temporarily renders inks
        for (var i = 0; i < inks.length; i++) {
            var ink2 = inks[i];
            ctx.fillStyle = ink2.color;
            ctx.lineWidth = ink2.radius;
            ctx.beginPath();
            
            if (i !== 0) {
                // stores previous ink and moves to previous ink x and y
                var ink1 = inks[i - 1];
                
                ctx.moveTo(ink1.x, ink1.y);
            } else {
                // moves to current ink x and y
                ctx.moveTo(ink2.x, ink2.y);
            }
            
            // moves to current ink x and y
            ctx.lineTo(ink2.x, ink2.y);
            ctx.stroke();
        }  
    } else if (mode === "lineSegmentFree") {
        // temporarily rendering line segments
        ctx.fillStyle = "white";
        ctx.fillRect(-canvas.width/2, -canvas.height/2, canvas.width, canvas.height);
        
        // renders lines
        ctx.lineWidth = 5;
        ctx.beginPath();
        ctx.moveTo(mouse.pX[mouse.pX.length - 1], mouse.pY[mouse.pY.length - 1]);
        ctx.lineTo(mouse.x, mouse.y);
        ctx.stroke();
        
        // renders points
        ctx.fillStyle = "black";
        ctx.beginPath();
        ctx.arc(mouse.pX[mouse.pX.length - 1], mouse.pY[mouse.pY.length - 1], 10, 0, 2 * Math.PI, false);
        ctx.fill();
        
        ctx.beginPath();
        ctx.arc(mouse.x, mouse.y, 10, 0, 2 * Math.PI, false);
        ctx.fill();
    } else if (mode === "lineFree") {
        // temporarily rendering lines
        ctx.fillStyle = "white";
        ctx.fillRect(-canvas.width/2, -canvas.height/2, canvas.width, canvas.height);
        
        // calculates slope and third and fourth points
        var slope = (mouse.pY[mouse.pY.length - 1] - mouse.y)/(mouse.pX[mouse.pX.length - 1] - mouse.x);
        if (!isFinite(slope)) {
            // calculates points vertically aligned if the line is vertical
            var x3 = mouse.x;
            var y3 = canvas.height * 2;
            var x4 = mouse.x;
            var y4 = -canvas.height * 2;
        } else {
            // calculates points based on slope of line and mouse coordinates
            var x3 = -canvas.width * 2;
            var y3 = slope * (-canvas.width * 2 - mouse.x) + mouse.y;
            var x4 = canvas.width * 2;
            var y4 = slope * (canvas.width * 2 - mouse.x) + mouse.y;
        }
        
        // renders line
        ctx.lineWidth = 5;
        ctx.beginPath();
        ctx.moveTo(x3, y3);
        ctx.lineTo(x4, y4);
        ctx.stroke();
        
        // renders points
        ctx.fillStyle = "black";
        ctx.beginPath();
        ctx.arc(mouse.pX[mouse.pX.length - 1], mouse.pY[mouse.pY.length - 1], 10, 0, 2 * Math.PI, false);
        ctx.fill();
        
        ctx.beginPath();
        ctx.arc(mouse.x, mouse.y, 10, 0, 2 * Math.PI, false);
        ctx.fill();
    } else if (mode === "circleFree") {
        // temporarily rendering circles
        ctx.fillStyle = "white";
        ctx.fillRect(-canvas.width/2, -canvas.height/2, canvas.width, canvas.height);
        
        // renders circle
        ctx.lineWidth = 5;
        ctx.beginPath();
        ctx.arc(mouse.pX[mouse.pX.length - 1], mouse.pY[mouse.pY.length - 1], Math.sqrt(Math.pow(mouse.x - mouse.pX[mouse.pX.length - 1], 2) + Math.pow(mouse.y - mouse.pY[mouse.pY.length - 1], 2)), 0, 2 * Math.PI, false);
        ctx.stroke();
        
        // renders center and mouse point collinear with circle
        ctx.fillStyle = "black";
        ctx.beginPath();
        ctx.arc(mouse.pX[mouse.pX.length - 1], mouse.pY[mouse.pY.length - 1], 10, 0, 2 * Math.PI, false);
        ctx.fill();
        
        ctx.beginPath();
        ctx.arc(mouse.x, mouse.y, 10, 0, 2 * Math.PI, false);
        ctx.fill();
    }
    
    ctx.restore();
};
    
function canvasUserUp() {
    mouse.draw = false;
    mouse.pX.push(mouse.x);
    mouse.pY.push(mouse.y);
    
    ctx.save();
    ctx.translate(canvas.width/2, canvas.height/2);
    ctx.scale(1, -1);
    
    if (mode === "move" && mouse.clickSelect !== null) {
        // places moved object
        var object = mouse.clickSelect;
        
        if (mouse.objectHover !== null && mouse.objectHover.class !== "label") {
            // stores one selected object
            mouse.select.push(mouse.objectHover);
        }
        
        if (mouse.twoObjectHover.length > 2) {
            // stores two selected objects
            if (mouse.twoObjectHover.length === 3 && mouse.clickSelect === mouse.twoObjectHover[0] && mouse.twoObjectHover[0].class === "circle") {
                // removes circle (which is click select) if it is in mouse.twoObjectHover
                // CHEAP METHOD
                mouse.twoObjectHover.splice(0, 1);
            }
            mouse.twoObjectHoverSelect.push(mouse.twoObjectHover[0], mouse.twoObjectHover[1]);
        }
        
        if (object.class === "point") {
            // places point
            var point = object;
            
            if (mouse.twoObjectHoverSelect.length === 2) {
                // sets selected point to intersection of two hovered objects
                snapPoints(point);
            } else if (mouse.colliding !== null && mouse.colliding.x !== mouse.pX[mouse.pX.length - 2] && mouse.colliding.y !== mouse.pY[mouse.pY.length - 2] && mouse.select[0] !== null && mouse.select[0] !== object) {
                // sets selected point collinear with a hovered object  
                point.x = mouse.colliding.x;
                point.y = mouse.colliding.y;
                
                // tests whether point is a circle center where the circle is congruent to another circle whose center is collinear with the other circle (two congruent circles whose centers are one radius away)
                var pointIsCenter = false;
                var circle2IsCongruent = false;
                
                for (var i = 0; i < circles.length; i++) {
                    // tests whether point is a circle center
                    var circle1 = circles[i];
                    
                    if (circle1.center === point) {
                        pointIsCenter = true;
                        
                        for (var j = 0; j < circles.length; j++) {
                            // tests whether circle 1 and circle 2 are congruent and circle 2 center is collinear to circle 1
                            var circle2 = circles[j];
                            
                            if (circle2.center.base !== null && circle2.center.base.indexOf(circle1) > -1 && circle2.center.specialClass === "collinear" && circle1.radius === circle2.radius) {
                                circle2IsCongruent = true;
                            }
                        }
                    }
                }
                
                if (!pointIsCenter && !circle2IsCongruent) {
                    snapPoints(point);
                }
            } else {
                // sets selected point to mouse coordinates
                point.x = mouse.pX[mouse.pX.length - 1];
                point.y = mouse.pY[mouse.pY.length - 1];
            }
            
            $("#canvasInterface span").html("Object placed");
        } else if (object.class === "circle") {
            // places circle
            var circle = object;
            var center = circle.center;
            
            if (mouse.twoObjectHover === 2) {
                // creates new point collinear with the circle
                points.push(new Point(mouse.colliding.x, mouse.colliding.y, "collinear", [mouse.select[0]]));
                var point = points[points.length - 1];
                // sets collinear point to intersection of two hovered objects
                snapPoints(point);
                
                // creates copy of circle center
                points.push(new Point(center.x, center.y, center.specialClass, center.base));
                var centerPoint = points[points.length - 1];
                if (center.specialClass === "collinear") {
                    // sets copy of circle center collinear with circle center base
                    centerPoint.setCollinearLine(center.base[0]);
                }
                // resets circle special class and bases
                circle.specialClass = "circlePoints";
                circle.base = [centerPoint, centerPoint, point];
                
                // sets circle radius to the distance between the circle center and point collinear with the circle
                circle.radius = Math.sqrt(Math.pow(point.x - center.x, 2) + Math.pow(point.y - center.y, 2));
            } if (mouse.colliding !== null && mouse.colliding.x !== mouse.pX[mouse.pX.length - 2] && mouse.colliding.y !== mouse.pY[mouse.pY.length - 2]) {
                // creates new point collinear with the circle 
                points.push(new Point(mouse.colliding.x, mouse.colliding.y, "collinear", [mouse.select[0]]));
                var point = points[points.length - 1];
                // sets collinear point collinear with the circle collinear with a hovered object
                snapPoints(point);
                
                // creates copy of circle center
                points.push(new Point(center.x, center.y, center.specialClass, center.base));
                var centerPoint = points[points.length - 1];
                if (center.specialClass === "collinear") {
                    // sets copy of circle center collinear with circle center base
                    if (center.base[0].class === "line" || center.base[0].class === "lineSegment") {
                        centerPoint.setCollinearLine(center.base[0]);
                    } else if (center.base[0].class === "circle") {
                        centerPoint.setCollinearCircle(center.base[0]);
                    }
                }
                // resets circle special class and bases
                circle.specialClass = "circlePoints";
                circle.base = [centerPoint, centerPoint, point];
            
                // sets circle radius to the distance between the circle center and point collinear with the circle
                circle.radius = Math.sqrt(Math.pow(point.x - center.x, 2) + Math.pow(point.y - center.y, 2));
            } else {
                // sets circle radius to the distance between the circle center and mouse coordinates
                circle.radius = Math.sqrt(Math.pow(mouse.pX[mouse.pX.length - 1] - center.x, 2) + Math.pow(mouse.pY[mouse.pY.length - 1] - center.y, 2));
            }
            
            $("#canvasInterface span").html("Object placed");
        } else if (object.class === "label") {
            // places label
            // sets label centered x and y to mouse x and y
            object.x = mouse.pX[mouse.pX.length - 1] - object.width/2;
            object.y = -mouse.pY[mouse.pY.length - 1] + object.height/4;
            
            $("#canvasInterface span").html("Object placed");
        } else if (object.class === "stroke") {
            // places stroke
            // sets first ink of stroke x and y to mouse x and y
            object.inks[0].x = mouse.x;
            object.inks[0].y = mouse.y;
            
            $("#canvasInterface span").html("Object placed");
        }
        
        mouse.clickSelect = null;
        mouse.select = [];
        mouse.twoObjectHoverSelect = [];
    } else if (mode === "marker") {
        // finishes stroke
        // creates new stroke with all inks stored.
        strokes.push(new Stroke(inks));
        inks = [];
    } else if (mode === "lineSegmentFree") {
        // finishes line segment
        if (mouse.colliding !== null && mouse.objectHover !== null) {
            // creates line segment where mouse is colliding with another object
            if (mouse.objectHover.class !== "label") {
                // one object selected
                mouse.select.push(mouse.objectHover);
            }
            if (mouse.twoObjectHover.length === 2) {
                // two objects selected
                mouse.twoObjectHoverSelect.push(mouse.twoObjectHover[0], mouse.twoObjectHover[1]);   
            }
            lineSegments.push(new LineSegment(mouse.pX[mouse.pX.length - 2], mouse.pY[mouse.pY.length - 2], mouse.colliding.x, mouse.colliding.y, null, [mouse.colliding]));
        } else {
            // creates line segment where mouse is not colliding with another object
            lineSegments.push(new LineSegment(mouse.pX[mouse.pX.length - 2], mouse.pY[mouse.pY.length - 2], mouse.pX[mouse.pX.length - 1], mouse.pY[mouse.pY.length - 1], null, null));
        }
        
        snapPoints(lineSegments[lineSegments.length - 1]);
        
        mouse.pSelect = [];
        mouse.select = [];
    } else if (mode === "lineFree" && mouse.pX[mouse.pX.length - 2] !== mouse.pX[mouse.pX.length - 1] && mouse.pY[mouse.pY.length - 2] !== mouse.pY[mouse.pY.length - 1]) {
        // finishes line
        if (mouse.colliding !== null && mouse.objectHover !== null) {
            // creates line where mouse is colliding with another object
            if (mouse.objectHover.class !== "label") {
                // one object selected
                mouse.select.push(mouse.objectHover);
            }
            if (mouse.twoObjectHover.length === 2) {
                // two objects selected
                mouse.twoObjectHoverSelect.push(mouse.twoObjectHover[0], mouse.twoObjectHover[1]);   
            }
            lines.push(new Line(mouse.pX[mouse.pX.length - 2], mouse.pY[mouse.pY.length - 2], mouse.colliding.x, mouse.colliding.y, null, [mouse.colliding]));
        } else {
            // creates line where mouse is not colliding with another object
            lines.push(new Line(mouse.pX[mouse.pX.length - 2], mouse.pY[mouse.pY.length - 2], mouse.pX[mouse.pX.length - 1], mouse.pY[mouse.pY.length - 1], null, null));
        }
        
        snapPoints(lines[lines.length - 1]);
        
        mouse.pSelect = [];
        mouse.select = [];  
    } else if (mode === "circleFree") {
        if (mouse.colliding !== null && mouse.objectHover !== null) {
            // creates circle where mouse is colliding with another object
            if (mouse.objectHover.class !== "label") {
                // one object selected
                mouse.select.push(mouse.objectHover);
            }
            if (mouse.twoObjectHover.length === 2) {
                // two objects selected
                mouse.twoObjectHoverSelect.push(mouse.twoObjectHover[0], mouse.twoObjectHover[1]);   
            }
            circles.push(new Circle(mouse.pX[mouse.pX.length - 2], mouse.pY[mouse.pY.length - 2], Math.sqrt(Math.pow(mouse.colliding.x - mouse.pX[mouse.pX.length - 2], 2) + Math.pow(mouse.colliding.y - mouse.pY[mouse.pY.length - 2], 2)), null, [mouse.colliding]));
        } else {
            // creates circle where mouse is not colliding with another object
            circles.push(new Circle(mouse.pX[mouse.pX.length - 2], mouse.pY[mouse.pY.length - 2], Math.sqrt(Math.pow(mouse.pX[mouse.pX.length - 1] - mouse.pX[mouse.pX.length - 2], 2) + Math.pow(mouse.pY[mouse.pY.length - 1] - mouse.pY[mouse.pY.length - 2], 2)), null, null));
        }
        
        snapPoints(circles[circles.length - 1]);
        
        mouse.pSelect = [];
        mouse.select = [];
    }
    
    mouse.pX = [];
    mouse.pY = [];
    mouse.twoObjectHoverSelect = [];
    mouse.pTwoObjectHoverSelect = [];
    
    ctx.restore();
};

// canvas user input controls
// desktop controls
canvas.addEventListener("mousedown", canvasUserDown);

canvas.addEventListener("mousemove", canvasUserMove);

canvas.addEventListener("mouseup", canvasUserUp);

// mobile controls
// credit: http://bencentra.com/code/2014/12/05/html5-canvas-touch-events.html
canvas.addEventListener("touchstart", function(e) {
    if (mobile) {
        mouse.x = mousePositionMobile(e).x;
        mouse.y = mousePositionMobile(e).y;
        
        // mouse colliding
        // line segments
        for (var i = 0; i < lineSegments.length; i++) {
            var lineSegment = lineSegments[i];
            
            if (lineSegment.mouseOver(mouse.x, mouse.y) && !lineSegment.hidden) {
                // adds line segment to mouse properties
                lineSegment.color = "#03A9F4";
                
                // mouse properties set to line segment
                if (Math.abs(lineSegment.slope) > 1) {
                    // mouse colliding when the absolute value of line segment slope is greater than 1
                    mouse.colliding = {
                        x: (mouse.y - lineSegment.point1.y)/lineSegment.slope + lineSegment.point1.x,
                        y: mouse.y,
                    };
                } else {
                    // mouse colliding when the absolute value of line segment slope is less than 1
                    mouse.colliding = {
                        x: mouse.x,
                        y: lineSegment.slope * (mouse.x - lineSegment.point1.x) + lineSegment.point1.y,
                    };
                }    
                
                mouse.objectHover = lineSegment;
            }
        }
        
        // lines
        for (var i = 0; i < lines.length; i++) {
            var line = lines[i];
            
            if (line.mouseOver(mouse.x, mouse.y) && !line.hidden) {
                // adds line to mouse properties
                line.color = "#03A9F4";
                
                // mouse properties set to line
                if (Math.abs(line.slope) > 1) {
                    // mouse colliding when the absolute value of line slope is greater than 1
                    mouse.colliding = {
                        x: (mouse.y - line.point1.y)/line.slope + line.point1.x,
                        y: mouse.y,
                    };
                } else {
                    mouse.colliding = {
                        // mouse colliding when the absolute value of line slope is less than 1
                        x: mouse.x,
                        y: line.slope * (mouse.x - line.point1.x) + line.point1.y,
                    };
                }
                
                mouse.objectHover = line;
            }
        }
        
        // circles
        for (var i = 0; i < circles.length; i++) {
            var circle = circles[i];
            
            if (circle.mouseOver(mouse.x, mouse.y) && !circle.hidden) {
                // adds circle segment to mouse properties
                circle.color = "#03A9F4";
            
                // mouse properties set to circle
                // establishes whether the mouse is above or below circle center (important for mouse colliding)
                var yFactor = 1;
                if (mouse.y < circle.center.y) {
                    yFactor = -1;
                }
                
                // establishes whether the mouse is left or right of the circle center (important for mouse colliding)
                var xFactor = 1;
                if (mouse.x < circle.center.x) {
                    xFactor = -1;    
                }
                
                if (!circle.hidden && mouse.clickSelect !== circle) {
                    // mouse properties set to circle
                    if (mouse.y > circle.center.y - 20 && mouse.y < circle.center.y + 20) {
                        // mouse colliding when mouse y is close to circle center y
                        mouse.colliding = {
                            // x equation derived from equation of circle
                            x: xFactor * Math.sqrt(Math.abs(Math.pow(circle.radius, 2) - Math.pow(mouse.y - circle.center.y, 2))) + circle.center.x,
                            y: mouse.y,    
                        };
                    } else {
                        // mouse colliding when mouse y is not close to circle center y
                        mouse.colliding = {
                            x: mouse.x,
                            // y equation derived from equation of circle
                            y: yFactor * Math.sqrt(Math.abs(Math.pow(circle.radius, 2) - Math.pow(mouse.x - circle.center.x, 2))) + circle.center.y,
                        };
                    }
                    
                    mouse.objectHover = circle;
                }
            }
        }
        
        // points
        for (var i = 0; i < points.length; i++) {
            var point = points[i];
            
            if (point.mouseOver(mouse.x, mouse.y) && !point.hidden) {
                
                // adds point to mouse properties
                point.color = "#03A9F4";
                
                // mouse properties set to point
                mouse.colliding = point;
                mouse.objectHover = point;
            }
        }
        
        // labels
        for (var i = 0; i < labels.length; i++) {
            var label = labels[i];
            
            if (label.mouseOver(mouse.x, mouse.y) && !label.hidden) {
            // adds label to mouse properties
            label.color = "#03A9F4";
            
            // mouse properties set to label
            mouse.objectHover = label;
                
            }
        }
        
        // strokes
        for (var i = 0; i < strokes.length; i++) {
            var stroke = strokes[i];
            
            if (stroke.mouseOver(mouse.x, mouse.y) && !stroke.hidden) {
                // adds stroke to mouse properties
                stroke.color = "#03A9F4";
                
                // mouse properties set to stroke
                mouse.objectHover = stroke;
            }
        }
        
        canvasUserDown();
    }    
}, false);

canvas.addEventListener("touchmove", function(e) {
    if (mobile) {
        mouse.x = mousePositionMobile(e).x;
        mouse.y = mousePositionMobile(e).y;
        
        canvasUserMove();
    }        
});

canvas.addEventListener("touchend", function(e) {
    if (mobile) {
        canvasUserUp();
        mouse.x = Math.pow(canvas.width, 3);
        mouse.y = Math.pow(canvas.height, 3);
    }        
});

// mobile scrolling prevention
document.body.addEventListener("touchstart", function (e) {
    if (e.target == canvas) {
    e.preventDefault();
    }
}, false);

document.body.addEventListener("touchend", function (e) {
    if (e.target == canvas) {
    e.preventDefault();
    }
}, false);

document.body.addEventListener("touchmove", function (e) {
    if (e.target == canvas) {
    e.preventDefault();
    }
}, false);

// main logic and rendering function
function update() {
    ctx.save();
    ctx.translate(canvas.width/2, canvas.height/2);
    ctx.scale(1, -1);
    
    //background
    if (!mouse.draw) {
        ctx.fillStyle = "white";
        ctx.fillRect(-canvas.width/2, -canvas.height/2, canvas.width, canvas.height);
    }
    
    // mouse
    $("#canvas").css("cursor", mouse.cursor);
        
    // line segments
    for (var i = 0; i < lineSegments.length; i++) {
        var lineSegment = lineSegments[i];
        
        // display properties depending on mode
        if (mode === "hideShow") {
            lineSegment.show = true;
        } else {
            if (lineSegment.hidden) {
                lineSegment.show = false;
            }
        }
        
        // mouse hovering
        if (lineSegment.mouseOver(mouse.x, mouse.y)) {
            // adds line segment to mouse properties
            lineSegment.color = "#03A9F4";
            
            if (!lineSegment.hidden) {
                // mouse properties set to line segment
                if (Math.abs(lineSegment.slope) > 1) {
                    // mouse colliding when the absolute value of line segment slope is greater than 1
                    mouse.colliding = {
                        x: (mouse.y - lineSegment.point1.y)/lineSegment.slope + lineSegment.point1.x,
                        y: mouse.y,
                    };
                } else {
                    // mouse colliding when the absolute value of line segment slope is less than 1
                    mouse.colliding = {
                        x: mouse.x,
                        y: lineSegment.slope * (mouse.x - lineSegment.point1.x) + lineSegment.point1.y,
                    };
                }
            
                mouse.objectHover = lineSegment;
                
                if (mouse.twoObjectHover.length < 3 && mouse.twoObjectHover.indexOf(lineSegment) < 0) {
                    mouse.twoObjectHover.push(lineSegment);
                }
                
                if (mode === "label") {
                    mouse.cursor = "text";
                } else {
                    mouse.cursor = "pointer";
                }
            } else if (mode === "hideShow") {
                mouse.cursor = "pointer";
            }
        } else if (lineSegment.color !== "black" && lineSegment.color !== "gray" && !lineSegment.mouseOver(mouse.x, mouse.y)) {
            // mouse not hovering over line segment
            if (mode === "hideShow" && lineSegment.hidden) {
                lineSegment.color = "gray";
            } else {
                lineSegment.color = "black";
            }
            
            // removes line segment from mouse properties
            mouse.colliding = null;
            mouse.objectHover = null;
            mouse.twoObjectHover.splice(mouse.twoObjectHover.indexOf(lineSegment), 1);
            mouse.cursor = "default";
        }
        
        lineSegment.slope = (lineSegment.point1.y - lineSegment.point2.y)/(lineSegment.point1.x - lineSegment.point2.x);
        
        // special class functions, calculations, and updates
        if (lineSegment.specialClass === "select") {
            // for line segments constructed by selecting two points
            // resets line segment point 1 and 2 special class and base
            lineSegment.point1.specialClass = "select";
            lineSegment.point2.specialClass = "select";
            lineSegment.point1.base = [lineSegment.base[0]];
            lineSegment.point2.base = [lineSegment.base[1]];
        }
        
        // rendering
        if (lineSegment.show) {
            ctx.strokeStyle = lineSegment.color;
            ctx.lineWidth = 5;
            ctx.beginPath();
            ctx.moveTo(lineSegment.point1.x, lineSegment.point1.y);
            ctx.lineTo(lineSegment.point2.x, lineSegment.point2.y);
            ctx.stroke();
        }
    }
    
    // lines
    for (var i = 0; i < lines.length; i++) {
        var line = lines[i];
        
        // display properties depending on mode
        if (mode === "hideShow") {
            line.show = true;
        } else {
            if (line.hidden) {
                line.show = false;
            }
        }
        
        // mouse hovering
        if (line.mouseOver(mouse.x, mouse.y)) {
            // adds line to mouse properties
            line.color = "#03A9F4";
            
            if (!line.hidden) {
                // mouse properties set to line
                if (Math.abs(line.slope) > 1) {
                    // mouse colliding when the absolute value of line slope is greater than 1
                    mouse.colliding = {
                        x: (mouse.y - line.point1.y)/line.slope + line.point1.x,
                        y: mouse.y,
                    };
                } else {
                    mouse.colliding = {
                        // mouse colliding when the absolute value of line slope is less than 1
                        x: mouse.x,
                        y: line.slope * (mouse.x - line.point1.x) + line.point1.y,
                    };
                }
            
                mouse.objectHover = line;
                if (mouse.twoObjectHover.length < 3 && mouse.twoObjectHover.indexOf(line) < 0) {
                    mouse.twoObjectHover.push(line);
                }
                
                if (mode === "label") {
                    mouse.cursor = "text";
                } else {
                    mouse.cursor = "pointer";
                }
            } else if (mode === "hideShow") {
                mouse.cursor = "pointer";
            }
        } else if (line.color !== "black" && line.color !== "gray" && !line.mouseOver(mouse.x, mouse.y)) {
            // mouse not hovering over line
            if (mode === "hideShow" && line.hidden) {
                line.color = "gray";
            } else {
                line.color = "black";
            }
            
            // removes line from mouse properties
            mouse.colliding = null;
            mouse.objectHover = null;
            mouse.twoObjectHover.splice(mouse.twoObjectHover.indexOf(line), 1);
            mouse.cursor = "default";
        }
        
        // special class functions, calculations, and updates
        if (line.specialClass === "select") {
            // for lines constructed by selecting two points
            // sets base coordinates to point 1 and point 2 coordinates of line
            line.base[0].x = line.point1.x; 
            line.base[0].y = line.point1.y;
            line.base[1].x = line.point2.x;
            line.base[1].y = line.point2.y;
            // resets line point 1 and 2 special class and base
            line.point1.specialClass = "select";
            line.point2.specialClass = "select";
            line.point1.base = [line.base[0]];
            line.point2.base = [line.base[1]];
            // calculates line slope
            line.slope = (line.point1.y - line.point2.y)/(line.point1.x - line.point2.x);
        } else if (line.specialClass === "perpendicular") {
            // for lines constructed perpendicular to a line through a point
            // resets line point 1 special class and base
            line.point1.specialClass = "construct";
            line.point1.base = [line.base[0]];
            // sets line slope to negative recipricol of slope of line base
            line.slope = -1/line.base[1].slope;
            
            // adjusting line point 2 to maintain a certain position relative to line point 1 (important during collinear point calculations on perpendicular lines)
            // two possible angles formed by line
            var angle1 = Math.atan2(line.slope, 1);
            var angle2 = Math.atan2(-line.slope, -1);
            
            // two possible x and y sets based on two possible angles 
            x1 = canvas.width * Math.cos(angle1) + line.point1.x;
            y1 = canvas.width * Math.sin(angle1) + line.point1.y;
            x2 = canvas.width * Math.cos(angle2) + line.point1.x;
            y2 = canvas.width * Math.sin(angle2) + line.point1.y;
            
            // sets line point 2 coordinates to the closest of the two possible coordinate sets
            if (Math.sqrt(Math.pow(x1 - line.point2.x, 2) + Math.pow(y1 - line.point2.y, 2)) < Math.sqrt(Math.pow(x2 - line.point2.x, 2) + Math.pow(y2 - line.point2.y, 2))) {
                line.point2.x = x1;
                line.point2.y = y1;
            } else {
                line.point2.x = x2;
                line.point2.y = y2;
            }
        } else if (line.specialClass === "parallel") {
            // for lines constructed parallel to a line through a point
            // resets line point 1 special class and base
            line.point1.specialClass = "construct";
            line.point1.base = [line.base[0]];
            // sets line slope to slope of line base
            line.slope = line.base[1].slope;
            
            // adjusting line point 2 to maintain a certain position relative to line point 1 (important during collinear point calculations on parallel lines)
            // two possible angles formed by line
            var angle1 = Math.atan2(line.slope, 1);
            var angle2 = Math.atan2(-line.slope, -1);
            
            // two possible x and y sets based on two possible angles
            x1 = canvas.width * Math.cos(angle1) + line.point1.x;
            y1 = canvas.width * Math.sin(angle1) + line.point1.y;
            x2 = canvas.width * Math.cos(angle2) + line.point1.x;
            y2 = canvas.width * Math.sin(angle2) + line.point1.y;
            
            // sets line point 2 coordinates to the closest of the two possible coordinate sets
            if (Math.sqrt(Math.pow(x1 - line.point2.x, 2) + Math.pow(y1 - line.point2.y, 2)) < Math.sqrt(Math.pow(x2 - line.point2.x, 2) + Math.pow(y2 - line.point2.y, 2))) {
                line.point2.x = x1;
                line.point2.y = y1;
            } else {
                line.point2.x = x2;
                line.point2.y = y2;
            }
        } else if (line.specialClass === "angleBisector") {
            // for lines constructed as an angle bisector of an angle by selecting two points
            // resets line point 2 special class and base
            line.point2.specialClass = "construct";
            line.point2.base = [line.base[1]];
            // sets line slope to slope of two returned coordinates from angleBisector function
            line.slope = (angleBisector(line.base[0], line.base[1], line.base[2]).y2 - angleBisector(line.base[0], line.base[1], line.base[2]).y1)/
            (angleBisector(line.base[0], line.base[1], line.base[2]).x2 - angleBisector(line.base[0], line.base[1], line.base[2]).x1);
            
            // adjusting line point 1 to maintain a certain position relative to line point 2 (important during collinear point calculations on angle bisector lines)
            // two possible angles formed by line
            var angle1 = Math.atan2(line.slope, 1);
            var angle2 = Math.atan2(-line.slope, -1);
            
            // two possible x and y sets based on two possible angles
            x1 = canvas.width * Math.cos(angle1) + line.point2.x;
            y1 = canvas.width * Math.sin(angle1) + line.point2.y;
            x2 = canvas.width * Math.cos(angle2) + line.point2.x;
            y2 = canvas.width * Math.sin(angle2) + line.point2.y;
            
            // sets line point 1 coordinates to the closest of the two possible coordinate sets
            if (Math.sqrt(Math.pow(x1 - line.point1.x, 2) + Math.pow(y1 - line.point1.y, 2)) < Math.sqrt(Math.pow(x2 - line.point1.x, 2) + Math.pow(y2 - line.point1.y, 2))) {
                line.point1.x = x1;
                line.point1.y = y1;
            } else {
                line.point1.x = x2;
                line.point1.y = y2;
            }
        } else {
            // sets line slope to slope between line point 1 and 2 if line has no special class
            line.slope = (line.point1.y - line.point2.y)/(line.point1.x - line.point2.x);    
        }
        
        // calculating points 3 and 4
        if (!isFinite(line.slope)) {
            // line is vertical
            line.point3.x = line.point1.x;
            line.point3.y = -canvas.height * 2;
            line.point4.x = line.point1.x;
            line.point4.y = canvas.height * 2;
        } else {
            // line is not vertical
            line.point3.x = -canvas.width * 2;
            line.point3.y = line.slope * (-canvas.width * 2 - line.point1.x) + line.point1.y;
            line.point4.x = canvas.width * 2;
            line.point4.y = line.slope * (canvas.width * 2 - line.point1.x) + line.point1.y;
        }
        
        // rendering
        if (line.show) {
            ctx.strokeStyle = line.color;
            ctx.lineWidth = 5;
            ctx.beginPath();
            ctx.moveTo(line.point3.x, line.point3.y);
            ctx.lineTo(line.point4.x, line.point4.y);
            ctx.stroke();
        } 
    }
    
    // circles
    for (var i = 0; i < circles.length; i++) {
        var circle = circles[i];
        
        // display properties depending on mode
        if (mode === "hideShow") {
            circle.show = true;
        } else {
            if (circle.hidden) {
                circle.show = false;
            }
        }
        
        // mouse hovering
        if (circle.mouseOver(mouse.x, mouse.y)) {
            // adds circle to mouse properties
            circle.color = "#03A9F4";
            
            // establishes whether the mouse is above or below circle center (important for mouse colliding)
            var yFactor = 1;
            if (mouse.y < circle.center.y) {
                yFactor = -1;
            }
            
            // establishes whether the mouse is left or right of the circle center (important for mouse colliding)
            var xFactor = 1;
            if (mouse.x < circle.center.x) {
                xFactor = -1;    
            }
            
            if (!circle.hidden && mouse.clickSelect !== circle) {
                // mouse properties set to circle
                if (mouse.y > circle.center.y - 20 && mouse.y < circle.center.y + 20) {
                    // mouse colliding when mouse y is close to circle center y
                    mouse.colliding = {
                        // x equation derived from equation of circle
                        x: xFactor * Math.sqrt(Math.abs(Math.pow(circle.radius, 2) - Math.pow(mouse.y - circle.center.y, 2))) + circle.center.x,
                        y: mouse.y,    
                    };
                } else {
                    // mouse colliding when mouse y is not close to circle center y
                    mouse.colliding = {
                        x: mouse.x,
                        // y equation derived from equation of circle
                        y: yFactor * Math.sqrt(Math.abs(Math.pow(circle.radius, 2) - Math.pow(mouse.x - circle.center.x, 2))) + circle.center.y,
                    };
                }
                
                mouse.objectHover = circle;
                
                if (mouse.twoObjectHover.length < 3 && mouse.twoObjectHover.indexOf(circle) < 0) {
                    mouse.twoObjectHover.push(circle);
                }
                
                if (mode == "move") {
                    mouse.cursor = "move";
                } else if (mode === "label") {
                    mouse.cursor = "text";
                } else {
                    mouse.cursor = "pointer";
                }
            } else if (mode === "hideShow") {
                mouse.cursor = "pointer";
            }
        } else if (circle.color !== "black" && circle.color !== "gray" && !circle.mouseOver(mouse.x, mouse.y)) {
            // mouse not hovering over circle
            if (mode === "hideShow" && circle.hidden) {
                circle.color = "gray";
            } else {
                circle.color = "black";
            }
            
            // removes line segment from mouse properties
            mouse.colliding = null;
            mouse.objectHover = null;
            mouse.twoObjectHover.splice(mouse.twoObjectHover.indexOf(circle), 1);
            mouse.cursor = "default";
        }
        
        // special class functions, calculations, and updates
        if (circle.specialClass === "circleLineSegment") {
            // for circles constructed centered at a point with a radius of a line segment
            var point = circle.base[0];
            var lineSegment = circle.base[1];
            
            // resets circle center special class and base
            circle.center.specialClass = "construct";
            circle.center.base = [point];
            
            // circle radius set to distance between endpoints of line segment
            circle.radius = Math.sqrt(Math.pow(lineSegment.point2.x - lineSegment.point1.x, 2) + Math.pow(lineSegment.point2.y - lineSegment.point1.y, 2));
        } else if (circle.specialClass === "circleCircle") {
            // for circles constructed centered at a point with a radius of a circle
            var point = circle.base[0];
            var circle2 = circle.base[1];
            
            // resets circle center special class and base
            circle.center.specialClass = "construct";
            circle.center.base = [point];
            
            // circle radius set to radius of circle which is the base
            circle.radius = circle2.radius;
        } else if (circle.specialClass === "circlePoints") {
            // for circles constructed centered at a point with a radius of the distance between two points
            var point = circle.base[0];
            var point1 = circle.base[1];
            var point2 = circle.base[2];
            
            // resets circle center special class and base
            circle.center.specialClass = "construct";
            circle.center.base = [point];
            
            // circle radius set to distance between two points
            circle.radius = Math.sqrt(Math.pow(point2.x - point1.x, 2) + Math.pow(point2.y - point1.y, 2));
        }
        
        // rendering
        if (circle.show) {
            ctx.strokeStyle = circle.color;
            ctx.lineWidth = 5;
            ctx.beginPath();
            ctx.arc(circle.center.x, circle.center.y, circle.radius, 0, 2 * Math.PI, false);
            ctx.stroke();
        }
    }
    
    // points
    for (var i = 0; i < points.length; i++) {
        var point = points[i];
        
        // display properties depending on mode
        if (mode === "hideShow") {
            point.show = true;
        } else {
            if (point.hidden) {
                point.show = false;
            }
        }
        
        // mouse hovering
        if (point.mouseOver(mouse.x, mouse.y)) {
            // adds line to mouse properties
            point.color = "#03A9F4";
            
            if (!point.hidden && mouse.clickSelect !== point && point.specialClass !== "select" && point.specialClass !== "construct") {
                // mouse properties set to point
                mouse.colliding = point;
                mouse.objectHover = point;
                
                if (mode == "move") {
                    mouse.cursor = "move";
                } else if (mode === "label") {
                    mouse.cursor = "text";
                } else {
                    mouse.cursor = "pointer";
                }
            } else if (mode === "hideShow") {
                mouse.cursor = "pointer";
            }
        } else if (point.color !== "black" && point.color !== "gray" && !point.mouseOver(mouse.x, mouse.y)) {
            // mouse not hovering over point
            if (mode === "hideShow" && point.hidden) {
                point.color = "gray";
            } else {
                point.color = "black";
            }
            
            // removes point from mouse properties
            mouse.colliding = null;
            mouse.objectHover = null;
            mouse.cursor = "default";
        }
        
        // special class functions, calculations, and updates
        if (point.specialClass === "select" || point.specialClass === "construct") {
            // for points set to location of another point
            // sets point x and y to point base x and y
            point.x = point.base[0].x;
            point.y = point.base[0].y;
        } else if (point.specialClass === "collinear") {
            // for points set collinear with another object
            if (point.base[0].class === "lineSegment" || point.base[0].class === "line") {
                // sets point collinear to line
                var line = point.base[0];
                
                // horizontal and vertical distance of line
                var lineLengthX = line.point2.x - line.point1.x;
                var lineLengthY = line.point2.y - line.point1.y;
                
                // resets point x and y
                point.x = line.point2.x - lineLengthX * point.lengthRatioX;
                point.y = line.point2.y - lineLengthY * point.lengthRatioY;
            } else if (point.base[0].class === "circle") {
                // sets point collinear to circle
                var circle = point.base[0];
                
                // sets point x and y collinear with circle based on point angle with circle center
                point.x = circle.radius * Math.cos(point.circleAngle) + circle.center.x;
                point.y = circle.radius * Math.sin(point.circleAngle) + circle.center.y;
            }
        } else if (point.specialClass === "intersection1") {
            // for points set to first intersection of two objects
            if ((point.base[0].class === "line" || point.base[0].class === "lineSegment") && (point.base[1].class === "line" || point.base[1].class === "lineSegment")) {
                // intersection of two lines
                var line1 = point.base[0];
                var line2 = point.base[1];
                
                if (intersectionLines(line1, line2) !== null) {
                    // sets point coordinates to coordinates of intersection between two lines
                    point.x = intersectionLines(line1, line2).x;
                    point.y = intersectionLines(line1, line2).y;
                }
            } else if (point.base[0].class === "circle" && point.base[1].class === "circle") {
                // intersection of two circles
                var circle1 = point.base[0];
                var circle2 = point.base[1];
                
                if (intersectionCircles(circle1, circle2) !== null) {
                    // sets point coordinates to first coordinates of intersection between two circles
                    point.x = intersectionCircles(circle1, circle2)[0].x;
                    point.y = intersectionCircles(circle1, circle2)[0].y;
                }
            } else if ((point.base[0].class === "line" || point.base[0].class === "lineSegment") && point.base[1].class === "circle") {
                // intersection of line and circle
                var line = point.base[0];
                var circle = point.base[1];
                
                if (intersectionLineCircle(line, circle) !== null) {
                    // sets point coordinates to first coordinates of intersection between line and circle
                    point.x = intersectionLineCircle(line, circle)[0].x;
                    point.y = intersectionLineCircle(line, circle)[0].y;
                }
            } else if ((point.base[1].class === "line" || point.base[1].class === "lineSegment") && point.base[0].class === "circle") {
                // intersection of line and circle
                var line = point.base[1];
                var circle = point.base[0];
                
                if (intersectionLineCircle(line, circle) !== null) {
                    // sets point coordinates to first coordinates of intersection between line and circle
                    point.x = intersectionLineCircle(line, circle)[0].x;
                    point.y = intersectionLineCircle(line, circle)[0].y;
                }
            }
        } else if (point.specialClass === "intersection2") {
            // for points set to second intersection of two objects
            if (point.base[0].class === "circle" && point.base[1].class === "circle") {
                // intersection of two circles
                var circle1 = point.base[0];
                var circle2 = point.base[1];
                
                if (intersectionCircles(circle1, circle2) !== null) {
                    // sets point coordinates to second coordinates of intersection between two circles
                    point.x = intersectionCircles(circle1, circle2)[1].x;
                    point.y = intersectionCircles(circle1, circle2)[1].y;
                }
            } else if ((point.base[0].class === "line" || point.base[0].class === "lineSegment") && point.base[1].class === "circle") {
                // intersection of line and circle
                var line = point.base[0];
                var circle = point.base[1];
                
                if (intersectionLineCircle(line, circle) !== null) {
                    // sets point coordinates to second coordinates of intersection between line and circle
                    point.x = intersectionLineCircle(line, circle)[1].x;
                    point.y = intersectionLineCircle(line, circle)[1].y;
                }
            } else if ((point.base[1].class === "line" || point.base[1].class === "lineSegment") && point.base[0].class === "circle") {
                // intersection of line and circle
                var line = point.base[1];
                var circle = point.base[0];
                
                if (intersectionLineCircle(line, circle) !== null) {
                    // sets point coordinates to second coordinates of intersection between line and circle
                    point.x = intersectionLineCircle(line, circle)[1].x;
                    point.y = intersectionLineCircle(line, circle)[1].y;
                }
            }
        } else if (point.specialClass === "midpointLineSegment") {
            // for points set to midpoint of line segment
            // sets point coordinates to coordinates of midpoint of line segment
            point.x = midpointLineSegment(point.base[0]).x;
            point.y = midpointLineSegment(point.base[0]).y;
        } else if (point.specialClass === "midpointPoints") {
            // for points set to midpoint of two points
            // sets point coordinates to coordinates of midpoint of two points
            point.x = midpointPoints(point.base[0], point.base[1]).x;
            point.y = midpointPoints(point.base[0], point.base[1]).y;
        }
        
        // rendering
        if (point.show && point.specialClass !== "select") {
            ctx.fillStyle = point.color;
            ctx.beginPath();
            ctx.arc(point.x, point.y, point.radius, 0, 2 * Math.PI, false);
            ctx.fill();
        }
    }
    
    // labels
    for (var i = 0; i < labels.length; i++) {
        var label = labels[i];
        
        // display properties depending on mode
        if (mode === "hideShow") {
            label.show = true;
        } else {
            if (label.hidden) {
                label.show = false;
            }
        }
        
        // mouse hovering
        if (label.mouseOver(mouse.x, mouse.y)) {
            // adds label to mouse properties
            label.color = "#03A9F4";
            
            if (!label.hidden) {
                // mouse properties set to label
                mouse.objectHover = label;
                
                if (mode == "move") {
                    mouse.cursor = "move";
                } else {
                    mouse.cursor = "pointer";
                }
            } else if (mode === "hideShow") {
                mouse.cursor = "pointer";
            }
        } else if (label.color !== "black" && label.color !== "gray" && !label.mouseOver(mouse.x, mouse.y)) {
            // mouse not hovering over label
            if (mode === "hideShow" && label.hidden) {
                label.color = "gray";
            } else {
                label.color = "black";
            }
            
            // removes label from mouse properties
            mouse.colliding = null;
            mouse.objectHover = null;
            mouse.cursor = "default";
        }
        
        // special class functions, calculations, and updates
        if (label.specialClass === "lengthLineSegment") {
            // for labels labelling length of line segment
            // label text set to rounded length of line segment
            label.text = Math.round(findLengthLineSegment(label.base[0]))/10 + " u";
        } else if (label.specialClass === "lengthPoints") {
            // for labels labelling distance between two points
            // label text set to rounded distance between two points
            label.text = Math.round(findLengthPoints(label.base[0], label.base[1]))/10 + " u";
        } else if (label.specialClass === "angle") {
            // for labels labbelling angle between three points
            // label text set to rounded angle between three points
            label.text = Math.round(10 * findAngle(label.base[0], label.base[1], label.base[2]))/10 + "°";
        } else if (label.specialClass === "labelPoint") {
            // for labels labelling a point
            var point = label.base[0];
            // label x set to point x plus 20
            label.x = point.x + 20;
            // label y set to negative point y due to inverted canvas y
            label.y = -point.y;
        } else if (label.specialClass === "labelLineSegment" || label.specialClass === "labelLine") {
            // for labels labelling lines
            var line = label.base[0];
            // label x set to average between line point 1 and 2 plus 20
            label.x = (line.point1.x + line.point2.x)/2 + 20;
            // label y set to negative average between line point 1 and 2 due to inverted canvas y
            label.y = -(line.point1.y + line.point2.y)/2;
        } else if (label.specialClass === "labelCircle") {
            // for labels labelling a circle
            var circle = label.base[0];
            // label x set to circle center x plus 20
            label.x = circle.center.x + 20;
            // label y set to negative circle center y due to inverted canvas y
            label.y = -circle.center.y;
        }
        
        // sets label width to ten times label text width
        label.width = label.text.toString().length * 10;
        
        // rendering
        if (label.show) {
            ctx.save();
            ctx.scale(1, -1);
            
            ctx.fillStyle = "white";
            ctx.fillRect(label.x - 5, label.y - 22.5, label.width + 10, label.height);
            ctx.fillStyle = label.color;
            ctx.font = "20px Arial";
            ctx.fillText(label.text, label.x, label.y);
            
            ctx.restore();
        }
    }
    
    // strokes
    for (var i = 0; i < strokes.length; i++) {
        var stroke = strokes[i];
        
        // display properties depending on mode
        if (mode === "hideShow") {
            stroke.show = true;
        } else {
            if (stroke.hidden) {
                stroke.show = false;
            }
        }
        
        
        // mouse hovering
        if (stroke.mouseOver(mouse.x, mouse.y)) {
            // adds stroke to mouse properties
            stroke.color = "#03A9F4";
            
            if (!stroke.hidden) {
                // mouse properties set to stroke
                mouse.objectHover = stroke;
                
                if (mode == "move") {
                    mouse.cursor = "move";
                } else {
                    mouse.cursor = "pointer";
                }
            } else if (mode === "hideShow") {
                mouse.cursor = "pointer";
            }
        } else if (stroke.color !== "black" && stroke.color !== "gray" && !stroke.mouseOver(mouse.x, mouse.y)) {
            // mouse not hovering over stroke
            if (mode === "hideShow" && stroke.hidden) {
                stroke.color = "gray";
            } else {
                stroke.color = "black";
            }
            
            // removes stroke from mouse properties
            mouse.objectHover = null;
            mouse.cursor = "default";
        }
        
        // ink rendering
        for (var j = 0; j < stroke.inks.length; j++) {
            if (stroke.show) {
                var ink2 = stroke.inks[j];
                
                ink2.x = stroke.inks[0].x + ink2.changeX;
                ink2.y = stroke.inks[0].y + ink2.changeY;
                
                ctx.strokeStyle = stroke.color;
                ctx.lineWidth = ink2.radius;
                ctx.beginPath();
                
                if (j !== 0) {
                    // stores previous ink and moves to previous ink x and y
                    var ink1 = stroke.inks[j - 1];
                    ctx.moveTo(ink1.x, ink1.y);
                } else {
                    // moves to current ink x and y
                    ctx.moveTo(ink2.x, ink2.y);
                }
                
                // moves to current ink x and y
                ctx.lineTo(ink2.x, ink2.y);
                ctx.stroke();
            }
        }    
    }
    
    ctx.restore();
    
    //recalls update function
    requestAnimationFrame(update);
};

// calls resize and update on load    
window.onload = function() {
    resize();
    update();
};
