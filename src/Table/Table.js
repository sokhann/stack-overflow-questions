import React from "react";
import TableContainer from "./components/TableContainer";

class Table extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      error: null,
      isLoaded: false,
      collection: [],
      order: "desc"
    };
  }

  componentDidMount() {
    this.loadData();
  }

  componentDidUpdate(prevProps, prevState) {
    // reload data when sort order change
    if (prevState.order !== this.state.order) {
      this.loadData();
    }
  }

  loadData() {
    let url = `https://api.stackexchange.com/2.2/questions?order=${this.state.order}&sort=creation&site=stackoverflow`;
    fetch(url)
      .then(res => (res.ok ? res.json() : Promise.reject(res)))
      .then(data => {
        this.setState({
          isLoaded: true,
          collection: data.items
        });
      })
      .catch(e => {
        this.setState({
          isLoaded: true,
          error: e
        });
      });
  }

  // changing sort order
  toggleDateSorter = () => {
    // debugger;
    if (this.state.order === "desc") {
      this.setState({
        order: "asc"
      });
    } else {
      this.setState({
        order: "desc"
      });
    }
  };

  render() {
    const { error, isLoaded, collection } = this.state;

    let content;

    if (error) {
      content = (
        <p className="empty-text">
          Ошибка!{" "}
          {error.message
            ? error.message
            : `${error.status} ${error.statusText}`}
        </p>
      );
    } else if (!isLoaded) {
      content = <p className="empty-text">Загрузка...</p>;
    } else {
      content = (
        <TableContainer items={collection} sortByDate={this.toggleDateSorter} />
      );
    }

    return content;
  }
}

export default Table;
