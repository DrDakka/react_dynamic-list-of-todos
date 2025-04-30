/* eslint-disable max-len */
import React, { useState, useEffect } from 'react';
import 'bulma/css/bulma.css';
import '@fortawesome/fontawesome-free/css/all.css';

import { TodoList } from './components/TodoList';
import { TodoFilter } from './components/TodoFilter';
import { TodoModal } from './components/TodoModal';
import { Loader } from './components/Loader';
import { getTodos } from './api';
import { Todo } from './types/Todo';

export const App: React.FC = () => {
  const [loaderIsVisible, setLoaderIsVisible] = useState(true);
  const [visibleTodos, setVisibleTodos] = useState<Todo[] | null>(null);
  const [selectedTodo, setSelectedTodo] = useState<null | Todo>(null);

  useEffect(() => {
    getTodos()
      .then(setVisibleTodos)
      .then(() => setLoaderIsVisible(false));
  }, []);

  const handleSelect = (todo: Todo) => {
    setSelectedTodo(todo);
  };

  const handleClose = () => {
    setSelectedTodo(null);
  };

  return (
    <>
      <div className="section">
        <div className="container">
          <div className="box">
            <h1 className="title">Todos:</h1>

            <div className="block">
              <TodoFilter />
            </div>

            <div className="block">
              {loaderIsVisible && <Loader />}
              {visibleTodos && (
                <TodoList todos={visibleTodos} onSelect={handleSelect} />
              )}
            </div>
          </div>
        </div>
      </div>

      {selectedTodo && <TodoModal todo={selectedTodo} onClick={handleClose} />}
    </>
  );
};
