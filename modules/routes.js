import Database from "../Database/index.js";
function ModuleRoutes(app) {
  app.get("/api/modules", (req, res) => {
    const modules = Database.modules;
    res.json(modules);
  });
  app.get("/api/courses/:id/modules", (req, res) => {
    const { id } = req.params;
    const modules = Database.modules.filter((module) => module.course === id);
    res.json(modules);
  });
  app.get("/api/modules/:id", (req, res) => {
    const { id } = req.params;
    const module = Database.modules.find((module) => module._id === id);
    if (!module) {
      res.status(404).send("Module not found");
      return;
    }
    res.json(module);
  });
  app.delete("/api/modules/:mid", (req, res) => {
    const { mid } = req.params;
    Database.modules = Database.modules.filter((m) => m._id !== mid);
    res.sendStatus(200);
  });
  app.post("/api/courses/:cid/modules", (req, res) => {
    const { cid } = req.params;
    const newModule = {
      ...req.body,
      course: cid,
      _id: new Date().getTime().toString(),
    };
    Database.modules.push(newModule);
    res.send(newModule);
  });
  app.put("/api/modules/:mid", (req, res) => {
    const { mid } = req.params;
    const moduleIndex = Database.modules.findIndex(
      (m) => m._id === mid);
    Database.modules[moduleIndex] = {
      ...Database.modules[moduleIndex],
      ...req.body
    };
    res.sendStatus(204);
  });
}
export default ModuleRoutes;
