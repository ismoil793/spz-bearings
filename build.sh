project=Kitmach
cd /var/www/front; rm -rf Kitmach &&
cd /var/www/front; rm -rf __MACOSX &&
cd /var/www/front; rm -rf Kitmach.zip
cp /home/shohubiyca/Kitmach.zip /var/www/front/Kitmach.zip &&
unzip Kitmach.zip &&
chown -R shohubiyca:shohubiyca /var/www/front/Kitmach/
cd Kitmach; rm -rf node_modules
cd Kitmach; npm i &&
cd Kitmach; npm run build &&  pm2 reload front
