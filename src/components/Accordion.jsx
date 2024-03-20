import { useState } from "react";
import "./Accordion.css";
import data from "./data";

const Accordion = () => {
  // ------States-------
  const [singleSelected, setSingleSelected] = useState(null);
  const [enableMultiSelection, setEnableMultiSelection] = useState(false);
  const [multipleSelected, setMultipleSelected] = useState([]);

  // ------Functionalities-------

  const handleSingleClick = (itemId) => {
    setSingleSelected(itemId === singleSelected ? null : itemId);
  };
  const handleMultiSelection = () => {
    setEnableMultiSelection((prevState) => !prevState);
  };

  const handleMultipleSelection = (itemId) => {
    let findIndex = multipleSelected.indexOf(itemId);
    if (findIndex == -1) setMultipleSelected([...multipleSelected, itemId]);
    else {
      const updatedSelection = [...multipleSelected];
      updatedSelection.splice(findIndex, 1);
      setMultipleSelected(updatedSelection);
    }
  };
  return (
    <section className="wrapper">
      <button onClick={handleMultiSelection} className="multi__btn">
        Enable Multiple Selection
      </button>
      <div className="accordion__container">
        {data && data.length > 0 ? (
          data.map((item) => (
            <div className="accordion__item" key={item.id}>
              <div
                onClick={
                  enableMultiSelection
                    ? () => handleMultipleSelection(item.id)
                    : () => handleSingleClick(item.id)
                }
                className="accordion__question"
              >
                {item.question}
                <button className="toggle__btn">
                  {singleSelected === item.id ||
                  multipleSelected.indexOf(item.id) !== -1
                    ? "-"
                    : "+"}
                </button>
              </div>
              {singleSelected === item.id ||
              multipleSelected.indexOf(item.id) !== -1 ? (
                <div className="accordion__answer">{item.answer}</div>
              ) : null}
            </div>
          ))
        ) : (
          <div>Data Not Found!</div>
        )}
      </div>
    </section>
  );
};

export default Accordion;
