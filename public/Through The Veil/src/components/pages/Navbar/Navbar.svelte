<script>
  import { Link } from 'svelte-routing';
  import { Navbar, NavBrand, NavLi, NavUl, NavHamburger } from "flowbite-svelte";
</script>

<Navbar>
  <NavBrand href="/">
    <img src='./assets/images/GGI.png' class="me-3 h-6 sm:h-9" alt="Through the Veil" />
    <span class="self-center text-xl font-semibold whitespace-nowrap dark:text-white">Through the Veil</span>
  </NavBrand>
  <NavHamburger />
  <NavUl>
    <NavLi href="/">Home</NavLi>
    <NavLi href="/weapons">Weapons</NavLi>
  </NavUl>
</Navbar>