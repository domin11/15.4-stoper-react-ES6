class Stopwatch extends React.Component {
    constructor(display) {
        super(display);
        this.state = {
          running: false,
          times: {
            minutes: 0,
            seconds: 0,
            miliseconds: 0
          }
        };
    }

    reset() {
        this.setState ({
          times: {
            minutes: 0,
            seconds: 0,
            miliseconds: 0
          }
        });
    }

    format() {
        return `${pad0(this.state.times.minutes)}:${pad0(this.state.times.seconds)}:${pad0(Math.floor(this.state.times.miliseconds))}`;
    }

    start() {
        if (!this.state.running) {
            this.setState({running: true});
            this.watch = setInterval(() => this.step(), 10);
        }
    }

    step() {
        if (!this.state.running) return;
        this.calculate();
    }

    calculate() {
        const times = this.state.times;
        times.miliseconds += 1;
        if (times.miliseconds >= 100) {
            times.seconds += 1;
            times.miliseconds = 0;
        }
        if (times.seconds >= 60) {
            times.minutes += 1;
            times.seconds = 0;
        }
        this.setState({times});
    }

    stop() {
        this.state.running = false;
        clearInterval(this.watch);
    }

    render() {
      return (
        <div>
          <div className = "stopwatch">{this.format()}</div>
          <ul className = "results"></ul>
          <nav className = "controls">
            <button className = "button btn btn-success" onClick = {() => this.start()}>Start</button>
            <button className = "button btn btn-success" onClick = {() => this.stop()}>Stop</button>
            <button className = "button btn btn-success" onClick = {() => this.reset()}>Reset</button>
          </nav>
        </div>)
    }
}

function pad0(value) {
    let result = value.toString();
    if (result.length < 2) {
        result = '0' + result;
    }
    return result;
}

var element = React.createElement(Stopwatch);
ReactDOM.render(element, document.getElementById('app'));
