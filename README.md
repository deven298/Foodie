# Foodie

Make sure all the following software is installed in your app to run Foodie locally.

```
Xcode
node and yarn (should be able to run commands like npm, npx, yarn)
expo
```

Clone the repo and follow the steps to build and run Foodie on an Xcode simulator

```
npm install react-native (run as sudo if throws an error)
```

then from the main directory run the following command to install packages for both the backend and frontend

```
make build_project
```

After the package installation is finished successfully, open two terminals and run the following commands simultaneously to run the backend and app

```
make build_backend
make run_foodie_local
```

NOTE: if the build_backend command throws an error, try running 
```
make build_backend_migrations
```
before running build_backend command.

For more details about the make commands, check Makefile.
