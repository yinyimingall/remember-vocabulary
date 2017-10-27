<template>
      <header>
        <router-link to="/new">
      <div class="btn-new">
        New
      </div>
        </router-link>

      <nav>
        <ul>
          <router-link to="/">
            <li>
              Home
            </li>
          </router-link>

          <router-link to="">
            <li>All</li>
          </router-link>

          <router-link to="/">
            <li>calendar</li>
          </router-link>

          <router-link to="/about">
            <li>About</li>
          </router-link>

        </ul>
      </nav>
      <div class="btn-today">
        Today
      </div>
    </header>
</template>

<script>
export default {};
</script>

<style scoped>
nav {
  height: 60px;
  background-color: #89c997;
  border-radius: 30px;
  margin: 0 0 0 80px;
  display: inline-block;
  font-size: 16px;
}

nav ul {
  list-style: none;
  margin: 0;
  padding: 0;
}

nav ul li {
  cursor: pointer;
  float: left;
  line-height: 60px;
  padding: 0 50px;
}

nav ul a {
  color: #fff;
  text-decoration: none;
}

nav ul a:active {
  color: #fff;
}

header {
  margin: 20px 0;
  font-size: 0;
  position: relative;
}

.btn-new {
  position: absolute;
  top: 0;
  left: 0;
  height: 60px;
  width: 60px;
  border-radius: 50%;
  text-align: center;
  line-height: 60px;
  color: #fff;
  background: #89c997;
  font-size: 14px;
  cursor: pointer;
}

.btn-today {
  position: absolute;
  top: 0;
  right: 0;
  height: 60px;
  width: 60px;
  text-align: center;
  line-height: 60px;
  color: #fff;
  background: #89c997;
  font-size: 14px;
  cursor: pointer;
}
</style>
