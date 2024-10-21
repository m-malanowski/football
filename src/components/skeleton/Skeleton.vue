<template>
  <div class="skeleton">
    <slot></slot>
  </div>
</template>

<style lang="scss">
.skeleton {
  h1,
  h2,
  h3,
  h4,
  h5,
  p,
  button,
  .skeleton-avatar {
    background-color: var(--app-color);
    background: linear-gradient(
        100deg,
        rgba(255, 255, 255, 0) 40%,
        rgba(255, 255, 255, 0.5) 50%,
        rgba(255, 255, 255, 0) 60%
      )
      var(--app-color);
    background-size: 200% 100%;
    background-position-x: 180%;
    animation: 1s loading ease-in-out infinite;
    animation-delay: 0.05s;
  }

  .skeleton-avatar {
    width: 50px;
    height: 50px;
    border-radius: 50%;
  }

  p {
    min-height: 1.2rem;
    border-radius: 4px;
  }

  h1 {
    min-height: 3.6rem;
    border-radius: 8px;
  }

  button {
    height: 47px;
    width: 150px;
    border-radius: var(--radius-sm);
  }
}

@keyframes loading {
  to {
    background-position-x: -20%;
  }
}

@keyframes loading-vertical {
  to {
    background-position-y: -40%;
  }
}
</style>
