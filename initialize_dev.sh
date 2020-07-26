echo -e "\e[93mInstalling client dependencies.\e[39m"
cd client
npm install
cd ..
cd server
echo -e "\e[94mInitializing server environment.\e[39m"
virtualenv env
source env/scripts/activate
echo -e "\e[94mInstalling server dependencies.\e[39m"
pip install -r requirements.txt
deactivate

echo -e '\e[5mDone!\e[39m use \e[92start_dev.sh\e[39m to set everything up.'