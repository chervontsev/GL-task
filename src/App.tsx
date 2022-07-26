import React from "react";
import "./styles.css";

interface IDataRecord {
  label: string; // unique
  value: number;
}

interface IAppProps {
  size?: number;
}

export default class App extends React.Component<
  IAppProps,
  { list: IDataRecord[] }
> {
  state = {
    list: Array.from({ length: this.props.size ?? 200 }, (_el, index) => ({
      label: `label ${index + 1}`,
      value: App.generateValue()
    }))
  };

  static generateValue() {
    return Math.round(100 + Math.random() * 900);
  }

  handleUpdate = (index: number) => {
    const { list } = this.state;
    list[index].value = App.generateValue();
    this.setState({ list });
  };

  render() {
    return (
      <div>
        <h1>Test app</h1>
        {this.state.list.map((el, index) => (
          <Row data={el} index={index} onUpdate={this.handleUpdate} />
        ))}
      </div>
    );
  }
}

interface IRowProps {
  data: unknown; // TODO
  index: number;
  onUpdate: (index: number) => void;
}

class Row extends React.Component<IRowProps> {
  renderCount = 0;

  handleUpdate = () => {
    this.props.onUpdate(this.props.index);
  };

  render() {
    const {
      data: { label, value }
    } = this.props;

    this.renderCount++;

    return (
      <div>
        <span className="label">{label}:</span>
        <span>{value}</span> <span>({this.renderCount})</span>{" "}
        <button className="button" onClick={this.handleUpdate}>
          Update
        </button>
      </div>
    );
  }
}
