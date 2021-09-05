<script>
  import { Router, Route, Link } from "svelte-navigator";
  import AddItems from "./lib/add-items/AddItems.svelte";
  import Home from "./lib/home/Home.svelte";
</script>

<main>
  <h3>Shopping List App</h3>
  <Router>
    <Link to="/">Home</Link>
    <Route>
      <Home />
    </Route>
    <Route path=":id"><AddItems /></Route>
  </Router>
</main>
