import React from "react";
import { create } from "react-test-renderer";
import Paginator from "./Paginator";

const onChangePage = (page: number) => {
    return
}

describe("Paginator component", () => {
    test("st", () => {
        const component = create(<Paginator totalCount={200} amountUsersOnPage={5} step={1} visiblePages={5} onChangePage={onChangePage}/>);
        const root = component.root;
        const spans = root.findAllByType("span");
        expect(spans.length).toBe(5);
    });
});
