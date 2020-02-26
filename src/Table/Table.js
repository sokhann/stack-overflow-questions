import React from "react";
import TableRow from "./components/TableRow";

// таблица
const TableContainer = ({ items, sortByDate }) => {
  const itemsList =
    items &&
    items.map(el => (
      <TableRow
        key={el.question_id}
        ownerAvatar={el.owner.profile_image}
        ownerName={el.owner.display_name}
        ownerLink={el.owner.link}
        title={el.title}
        questionLink={el.link}
        tags={el.tags}
        date={el.creation_date}
      />
    ));

  return (
    <div className="table">
      <div className="table__row table__header">
        <button className="table__cell" disabled>
          Автор
        </button>
        <button className="table__cell" disabled>
          Заголовок вопроса
        </button>
        <button className="table__cell" disabled>
          Теги
        </button>
        <button className="table__cell" onClick={sortByDate}>
          Дата создания
        </button>
      </div>
      <div className="table__body">{itemsList}</div>
    </div>
  );
};

class Table extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      error: null,
      isLoaded: false,
      collection: [],
      sortedCollection: [],
      order: "desc"
    };
  }

  componentDidMount() {
    this.loadData();
  }

  componentDidUpdate(prevProps, prevState) {
    //перегрузить при изменении порядка сортировки
    if (prevState.order !== this.state.order) {
      this.loadData();
    }
  }

  loadData() {
    let url = `https://api.stackexchange.com/2.2/questions?order=${this.state.order}&sort=creation&site=stackoverflow`;
    fetch(url)
      .then(res => (res.ok ? res.json() : Promise.reject(res)))
      .then(result => {
        this.setState({
          isLoaded: true,
          collection: result.items
        });
      })
      .catch(e => {
        this.setState({
          isLoaded: true,
          error: e
        });
      });
  }

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
