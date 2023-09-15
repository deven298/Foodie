# Foodie

Make sure all the following softwares are installed in your app to run Foodie locally.

'''
Xcode
node and yarn (should be able to run commands like npm, npx, yarn)
expo
'''

Clone the repo and follow the steps to build and run Foodie on a xcode simulator

'''
npm install react-native (run as sudo, if throws error)
'''

then from the main directory run the following command to install packages for both backend and frontend

'''
make build_project
'''

After building is finished successfully, open two terminals and run the following commands simultaneously to run backend and app

'''
make build_backend
make run_foodie_local
'''

NOTE: if build_backend command throws error, try running 

'''
make build_backend_migrations
'''

before running build_backend command.

For more details about the make commands, check Makefile.