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

  // sorting data
  sortByDate() {
    const { order, collection } = this.state;
    let data = collection;
    data.sort((a, b) => {
      let dateA = a.creation_date,
        dateB = b.creation_date;
      if (dateA < dateB) {
        return order === "asc" ? -1 : 1;
      }
      if (dateA > dateB) {
        return order === "asc" ? 1 : -1;
      }
      return 0;
    });
    return data;
  }

  render() {
    const { error, isLoaded } = this.state;

    let items = this.sortByDate();

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
        <TableContainer items={items} sortByDate={this.toggleDateSorter} />
      );
    }

    return content;
  }
}

export default Table;
