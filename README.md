# PossiFront
Ce projet concerne le front-end de l'application POSSI

## Pré-réquis
- Node.js 12 ou un plus récent
## Serveur de développment

Avant de faire quoique ce soit il faudra modifier le fichier **hosts** de votre machine pour avoir des problèmes avec le SSO de l'université de Rennes 1.
Vous trouverez où se situe ce fichier en fonction de vos OS:
- Windows (95 ; 98 ; ME) : C:\windows\hosts

- Windows (2000 ; XP ; Vista ; Seven) : C:\windows\system32\drivers\etc\hosts

- Windows NT : C:\winnt\system32\drivers\etc\hosts

- FreeBSD ; Linux et Mac OS X : /etc/hosts

Une fois dans ce fichier ajouter la ligne `127.0.0.1       possi2019.univ-rennes1.fr`

Cloner le projet à l'aide de la commande `git clone https://github.com/koitrinkoffi/possiFront.git`

Installer les dépendences du projets avec la commande `npm i`

Ensuite installer le **Angular CLI** avec la commande `npm i -g @angular/cli`

Enfin lancer `ng s --host=possi2019.univ-rennes1.fr` pour demarrer Angular.
