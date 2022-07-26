import React from "react";
import "./styles.css";

interface IDataRecord {
  label: string; // unique
  value: number;
}

interface IAppProps {
  size?: number;
}

interface IAppState {
  list: IDataRecord[];
}

export default class App extends React.PureComponent<IAppProps, IAppState> {
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
          <Row
            key={el.label}
            data={el}
            index={index}
            onUpdate={this.handleUpdate}
          />
        ))}
      </div>
    );
  }
}

interface IRowProps {
  data: IDataRecord;
  index: number;
  onUpdate: (index: number) => void;
}

interface IRowState {
  renderCount: number;
}

class Row extends React.Component<IRowProps, IRowState> {
  state = {
    renderCount: 0
  };

  handleUpdate = () => {
    this.props.onUpdate(this.props.index);
    this.setState({ renderCount: this.state.renderCount + 1 });
  };

  render() {
    const {
      data: { label, value }
    } = this.props;

    return (
      <div>
        <span className="label">{label}:</span>
        <span>{value}</span> <span>({this.state.renderCount})</span>{" "}
        <button className="button" onClick={this.handleUpdate}>
          Update
        </button>
      </div>
    );
  }
}
