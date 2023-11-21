import Database from "../Database/index.js";
function AssignmentRoutes(app) {
  app.get("/api/courses/:cid/assignments", (req, res) => {
    const { cid } = req.params;
    const assignments = Database.assignments.filter((assignment) => assignment.course === cid);
    res.json(assignments);
  });
  app.get("/api/assignments/:id", (req, res) => {
    const { id } = req.params;
    const assignment = Database.assignments
      .find((a) => a._id === id);
    if (!assignment) {
      res.status(404).send("Assignment not found");
      return;
    }
    res.send(assignment);
  });
  app.delete("/api/assignments/:id", (req, res) => {
    const { id } = req.params;
    Database.assignments = Database.assignments
      .filter((a) => a._id !== id);
    res.sendStatus(204);
  });
  app.post("/api/courses/:cid/assignments", (req, res) => {
    const { cid } = req.params;
    const assignment = { ...req.body,
      course: cid,
      _id: new Date().getTime().toString() };
    Database.assignments.push(assignment);
    res.send(assignment);
  });
  app.put("/api/assignments/:id", (req, res) => {
    const { id } = req.params;
    const assignment = req.body;
    Database.assignments = Database.assignments.map((a) =>
      a._id === id ? { a, ...assignment } : a
    );
    res.sendStatus(204);
  });
}
export default AssignmentRoutes;
