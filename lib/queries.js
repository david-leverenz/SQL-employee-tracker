// This is the constructor function that sets the shape's color.  It is a parent constructor function. I export each child constructor.
class Shape {
    constructor() {
        this.color = "";
    }
    setColor(color) {
        this.color = color;
    }
}
// Each shape use the same color that was set by the parent constructor.  Below are the child constructors that use the shape color.  There is a different method for each shape because each shape uses different svg info to create it.
class Triangle extends Shape {

    render() {
        return `<polygon points="150, 18 244, 182 56, 182" fill="${this.color}" />`
    }
}

class Circle extends Shape {

    render() {
        return `<circle cx="150" cy="100" r="80" fill="${this.color}" />`
    }
}
class Square extends Shape {

    render() {
        return `<rect x="90" y="40" width="120" height="120" fill="${this.color}" />`
    }
}

module.exports = { Circle, Square, Triangle }