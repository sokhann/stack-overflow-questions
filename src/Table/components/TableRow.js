import React from "react";
import moment from "moment";
import he from "he"; // HTML entity encoder/decoder

// tag element
const TagItem = ({ tag }) => {
  return <button className="tag">{tag}</button>;
};

// row of table
const TableRow = ({
  ownerAvatar,
  ownerName,
  ownerLink,
  title,
  questionLink,
  tags,
  date
}) => {
  const tagList = tags.map((el, index) => <TagItem tag={el} key={index} />);
  const dt = moment
    .unix(date)
    .format("DD.MM.YY HH:mm:ss")
    .toString();
  return (
    <div className="table__row">
      <div className="table__cell">
        <a
          className="user"
          target="_blank"
          rel="noopener noreferrer"
          href={ownerLink}
        >
          <div className="user__avatar">
            <img
              src={ownerAvatar}
              alt="user avatar"
              onError={e => {
                e.target.src =
                  "https://image.flaticon.com/icons/svg/483/483361.svg";
              }}
            />
          </div>
          <p className="user__name">{he.decode(ownerName)}</p>
        </a>
      </div>
      <div className="table__cell">
        <a target="_blank" rel="noopener noreferrer" href={questionLink}>
          {he.decode(title)}
        </a>
      </div>
      <div className="table__cell">{tagList}</div>
      <div className="table__cell">{dt}</div>
    </div>
  );
};

export default TableRow;
