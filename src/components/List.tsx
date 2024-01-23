import styled from "@emotion/styled";
import React, { FC, useEffect, useRef, useState, useCallback } from "react";
import { Item } from "./Item";
import { SafelyRenderChildren } from "./SafelyRenderChildren";
import { useScrollPosition } from "../hooks/useScrollPosition";

const ScrollWrapper = styled.div`
  border: 1px solid black;
  width: 100%;
  height: 500px;
  overflow: auto;
`;

const ListWrapper = styled.ul`
  margin: 0;
  padding: 0;
`;

export interface ListProps {
  items: string[];
}

export const List: FC<ListProps> = ({ items, children }) => {
  const divRef = useRef<HTMLDivElement>(null);
  const scrollPosition = useScrollPosition(divRef);
  const [sliceValue, setSliceValue] = useState(50);
  const [searchTerm, setSearchTerm] = useState<string>('');

  const incrementSliceValue = useCallback(() => {
    setSliceValue((prevSliceValue) => prevSliceValue + 50);
  }, []);

  useEffect(() => {
    const handleScroll = () => {
      if (divRef.current) {
        const isBottom =
          divRef.current.scrollTop + divRef.current.clientHeight ===
          divRef.current.scrollHeight;

        if (isBottom) {
          incrementSliceValue();
        }
      }
    };

    divRef.current?.addEventListener("scroll", handleScroll);

    return () => {
      divRef.current?.removeEventListener("scroll", handleScroll);
    };
  }, [incrementSliceValue]);

  return (
    <ScrollWrapper ref={divRef}>
      <input
          type="text"
          value={searchTerm}
          onChange={(e) => setSearchTerm(e.target.value)}
          placeholder="Enter search term"
        />
      <ListWrapper>
        <SafelyRenderChildren>
          {items
          .filter((word) => word.toLowerCase().includes(searchTerm.toLowerCase()))
          .slice(0, sliceValue).map((word) => (
            <Item key={word}>{word}</Item>
          ))}
        </SafelyRenderChildren>
      </ListWrapper>
    </ScrollWrapper>
  );
};
