const controller = require("./CV006ConvocarAttendant");

test("dummy", () => {
  const res = () => {
    const json = (x) => {};
    const status = (x) => {
      return { json: json };
    };
    return { json, status };
  };

  const req = jest.fn();
  req.mockReturnValueOnce({
    params: {
      cedula: "1234567890",
      consecutivo: "1",
    },
  });

  const query = jest.fn(x => [[0]]);
  const db = {
    sequelize: {
      query: query,
    }
  };

  controller(db).getCouncilAttendant(req(), res()).then(() => {
    expect(query.mock.calls.length).toBe(1);
  });

});
