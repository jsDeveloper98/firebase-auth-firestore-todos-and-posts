import React from "react";

const FilterButtons = (props) => {
  return (
    <React.Fragment>
      <div className="todos-count">{props.filteredTodos.length} items</div>
      <div
        className={activeAll(props.filterParam)}
        onClick={() => props.setFilter("all")}
      >
        All
      </div>
      <div
        className={activeNotCompleted(props.filterParam)}
        onClick={() => props.setFilter("active")}
      >
        Active
      </div>
      <div
        className={activeCompleted(props.filterParam)}
        onClick={() => props.setFilter("completed")}
      >
        Completed
      </div>
      {props.completedTodos.length ? (
        <div className="remove-completed" onClick={props.removeCompletedTodos}>
          Remove completed
        </div>
      ) : null}
    </React.Fragment>
  );
};

export default FilterButtons;

function activeAll(filterParam) {
  let classes = "filter-btn";
  classes += filterParam === "all" ? " -active" : "";
  return classes;
}

function activeNotCompleted(filterParam) {
  let classes = "filter-btn";
  classes += filterParam === "active" ? " -active" : "";
  return classes;
}

function activeCompleted(filterParam) {
  let classes = "filter-btn";
  classes += filterParam === "completed" ? " -active" : "";
  return classes;
}
