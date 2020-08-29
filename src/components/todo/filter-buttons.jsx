import React from "react";

const FilterButtons = ({
  completedTodos,
  filterParam,
  activeTodos,
  removeCompletedTodos,
  setFilter,
}) => {
  return (
    <>
      <div className="todos-count">{activeTodos.length} items left</div>
      <div className={activeAll(filterParam)} onClick={() => setFilter("all")}>
        All
      </div>
      <div
        className={activeNotCompleted(filterParam)}
        onClick={() => setFilter("active")}
      >
        Active
      </div>
      <div
        className={activeCompleted(filterParam)}
        onClick={() => setFilter("completed")}
      >
        Completed
      </div>
      {completedTodos.length ? (
        <div className="remove-completed" onClick={removeCompletedTodos}>
          Remove completed
        </div>
      ) : null}
    </>
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
