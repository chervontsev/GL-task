import React, { useState } from "react";
// import React, { useState, useReducer } from "react"; // NOTE: For App3 proposal (below)
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

class App extends React.PureComponent<IAppProps, IAppState> {
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
          <Row2
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

export default function App2(props: IAppProps) {
  const generateValue = () => {
    return Math.round(100 + Math.random() * 900);
  };

  const listSize = { length: props.size ?? 200 };
  const listMap = (_el: undefined, index: number) => ({
    label: `label ${index + 1}`,
    value: generateValue()
  });

  const initialList = Array.from(listSize, listMap);

  const [state, setState] = useState({
    list: initialList as IDataRecord[]
  });

  const handleUpdate = (index: number) => {
    setState((state) => {
      state.list[index].value = generateValue();
      return state;
    });
  };

  return (
    <div>
      <h1>Test app</h1>
      {state.list.map((el, index) => (
        <Row2 key={el.label} data={el} index={index} onUpdate={handleUpdate} />
      ))}
    </div>
  );
}

// NOTE: App3 Proposal -------------------

// interface IState {
//   list: IDataRecord[];
// };

// interface IListAction {
//   type: string;
//   payload: number;
// }

// const generateValue = () => {
//   return Math.round(100 + Math.random() * 900);
// };

// const listMapper = (_el: undefined, index: number): IDataRecord => ({
//   label: `label ${index + 1}`,
//   value: generateValue(),
// });

// const initialListState = (size = 200): IState => {
//   return {
//     list: Array.from({ length: size }, listMapper)
//   };
// }

// const listReducer = (state: IState, action: IListAction) => {
//   switch (action.type) {
//     case "CHANGE":
//       state.list[action.payload].value = generateValue();
//       return state;
//     default:
//       return state;
//   }
// };

// export default function App3 (props: IAppProps) {
//   const [state, dispatch] = useReducer(listReducer, initialListState(props.size));

//   const handleUpdate = (index: number) => {
//     dispatch({ type: 'CHANGE', payload: index });
//   };

//   return (
//     <div>
//       <h1>Test app</h1>
//       {
//         state.list.map((el, index) => (
//           <Row key={el.label} data={el} index={index} onUpdate={handleUpdate} />
//         ))
//       }
//     </div>
//   );
// };

// --------------------------------------

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

const Row2 = ({ data, index, onUpdate }: IRowProps) => {
  const { label, value } = data;
  const [renderCount, setRenderCount] = useState(0);

  const handleUpdate = () => {
    onUpdate(index);
    setRenderCount(renderCount + 1);
  };

  return (
    <div>
      <span className="label">{label}:</span>
      <span>{value}</span> <span>({renderCount})</span>{" "}
      <button className="button" onClick={handleUpdate}>
        Update
      </button>
    </div>
  );
};
