import React from 'react';
import { useTranslation } from 'react-i18next';
import './PolitiqueConfidentialite.css';

const PolitiqueConfidentialite = () => {
  const { t, ready } = useTranslation();

  return (
    <div className="politique-confidentialite">
      <h1>{ready ? t('politique_confidentialite.title') : 'Politique de Confidentialité'}</h1>
      <p className="intro">{ready ? t('politique_confidentialite.intro') : 'Cette politique de confidentialité décrit la manière dont Yasli, une entreprise de nettoyage basée à Marseille, collecte, utilise, et protège les données personnelles que vous nous fournissez via notre site web.'}</p>

      <section>
        <h2>{ready ? t('politique_confidentialite.responsable.title') : '1. Responsable du traitement des données'}</h2>
        <p>{ready ? t('politique_confidentialite.responsable.description') : 'Yasli, située au 4 Place Esquiros, 13010 Marseille, France, est le responsable du traitement des données personnelles collectées via ce site. Vous pouvez nous contacter par email à contact@yasli.fr ou par téléphone au +33 4 91 00 00 00.'}</p>
      </section>

      <section>
        <h2>{ready ? t('politique_confidentialite.donnees_collectees.title') : '2. Données personnelles collectées'}</h2>
        <p>{ready ? t('politique_confidentialite.donnees_collectees.description') : 'Nous collectons les types de données suivants :'}</p>
        <ul>
          <li>{ready ? t('politique_confidentialite.donnees_collectees.liste.0') : 'Données d’identification : nom, prénom, adresse email, numéro de téléphone.'}</li>
          <li>{ready ? t('politique_confidentialite.donnees_collectees.liste.1') : 'Données de réservation : type de service, date, heure, adresse de prestation.'}</li>
          <li>{ready ? t('politique_confidentialite.donnees_collectees.liste.2') : 'Données de navigation : adresse IP, type de navigateur, pages visitées, cookies.'}</li>
          <li>{ready ? t('politique_confidentialite.donnees_collectees.liste.3') : 'Données de contact : messages envoyés via le formulaire de contact.'}</li>
        </ul>
      </section>

      <section>
        <h2>{ready ? t('politique_confidentialite.finalites.title') : '3. Finalités du traitement'}</h2>
        <p>{ready ? t('politique_confidentialite.finalites.description') : 'Les données collectées sont utilisées pour :'}</p>
        <ul>
          <li>{ready ? t('politique_confidentialite.finalites.liste.0') : 'Gérer vos demandes de réservation et de contact.'}</li>
          <li>{ready ? t('politique_confidentialite.finalites.liste.1') : 'Fournir et organiser nos services de nettoyage.'}</li>
          <li>{ready ? t('politique_confidentialite.finalites.liste.2') : 'Améliorer notre site et nos services grâce à l’analyse de votre navigation.'}</li>
          <li>{ready ? t('politique_confidentialite.finalites.liste.3') : 'Vous envoyer des communications (si vous y avez consenti), comme des offres promotionnelles ou des rappels de rendez-vous.'}</li>
          <li>{ready ? t('politique_confidentialite.finalites.liste.4') : 'Respecter nos obligations légales et réglementaires.'}</li>
        </ul>
      </section>

      <section>
        <h2>{ready ? t('politique_confidentialite.base_legale.title') : '4. Base légale du traitement'}</h2>
        <p>{ready ? t('politique_confidentialite.base_legale.description') : 'Nous traitons vos données personnelles sur les bases légales suivantes :'}</p>
        <ul>
          <li>{ready ? t('politique_confidentialite.base_legale.liste.0') : 'Exécution d’un contrat : pour gérer vos réservations et répondre à vos demandes.'}</li>
          <li>{ready ? t('politique_confidentialite.base_legale.liste.1') : 'Consentement : pour l’utilisation de cookies non essentiels et l’envoi de communications marketing.'}</li>
          <li>{ready ? t('politique_confidentialite.base_legale.liste.2') : 'Intérêt légitime : pour améliorer nos services et analyser l’utilisation de notre site.'}</li>
          <li>{ready ? t('politique_confidentialite.base_legale.liste.3') : 'Obligation légale : pour répondre aux exigences réglementaires.'}</li>
        </ul>
      </section>

      <section>
        <h2>{ready ? t('politique_confidentialite.conservation.title') : '5. Durée de conservation des données'}</h2>
        <p>{ready ? t('politique_confidentialite.conservation.description') : 'Nous conservons vos données personnelles aussi longtemps que nécessaire pour atteindre les finalités décrites ci-dessus :'}</p>
        <ul>
          <li>{ready ? t('politique_confidentialite.conservation.liste.0') : 'Données de réservation : conservées pendant 5 ans après la fin de la prestation.'}</li>
          <li>{ready ? t('politique_confidentialite.conservation.liste.1') : 'Données de contact : conservées pendant 3 ans après votre dernière interaction avec nous.'}</li>
          <li>{ready ? t('politique_confidentialite.conservation.liste.2') : 'Données de navigation : conservées pendant 13 mois maximum (conformément à la législation sur les cookies).'}</li>
        </ul>
        <p>{ready ? t('politique_confidentialite.conservation.note') : 'Au-delà de ces durées, vos données seront anonymisées ou supprimées, sauf si une obligation légale nous impose de les conserver plus longtemps.'}</p>
      </section>

      <section>
        <h2>{ready ? t('politique_confidentialite.destinataires.title') : '6. Destinataires des données'}</h2>
        <p>{ready ? t('politique_confidentialite.destinataires.description') : 'Vos données peuvent être partagées avec :'}</p>
        <ul>
          <li>{ready ? t('politique_confidentialite.destinataires.liste.0') : 'Nos employés et prestataires impliqués dans la fourniture des services de nettoyage.'}</li>
          <li>{ready ? t('politique_confidentialite.destinataires.liste.1') : 'Nos partenaires techniques (hébergeurs, fournisseurs d’outils d’analyse) qui agissent en tant que sous-traitants.'}</li>
          <li>{ready ? t('politique_confidentialite.destinataires.liste.2') : 'Les autorités légales, si nous y sommes contraints par la loi.'}</li>
        </ul>
        <p>{ready ? t('politique_confidentialite.destinataires.note') : 'Nous ne vendons ni ne louons vos données personnelles à des tiers à des fins commerciales.'}</p>
      </section>

      <section>
        <h2>{ready ? t('politique_confidentialite.cookies.title') : '7. Cookies'}</h2>
        <p>{ready ? t('politique_confidentialite.cookies.description') : 'Nous utilisons des cookies pour :'}</p>
        <ul>
          <li>{ready ? t('politique_confidentialite.cookies.liste.0') : 'Assurer le bon fonctionnement du site (cookies essentiels).'}</li>
          <li>{ready ? t('politique_confidentialite.cookies.liste.1') : 'Analyser l’utilisation du site (cookies analytiques).'}</li>
          <li>{ready ? t('politique_confidentialite.cookies.liste.2') : 'Personnaliser votre expérience et proposer des publicités ciblées (cookies marketing, avec votre consentement).'}</li>
        </ul>
        <p>{ready ? t('politique_confidentialite.cookies.consent') : 'Lors de votre première visite, une bannière vous permet de gérer vos préférences en matière de cookies. Vous pouvez modifier vos choix à tout moment via les paramètres de votre navigateur.'}</p>
      </section>

      <section>
        <h2>{ready ? t('politique_confidentialite.securite.title') : '8. Sécurité des données'}</h2>
        <p>{ready ? t('politique_confidentialite.securite.description') : 'Nous mettons en place des mesures techniques et organisationnelles pour protéger vos données personnelles contre les accès non autorisés, la perte ou la divulgation. Par exemple :'}</p>
        <ul>
          <li>{ready ? t('politique_confidentialite.securite.liste.0') : 'Chiffrement des données sensibles (HTTPS, SSL).'}</li>
          <li>{ready ? t('politique_confidentialite.securite.liste.1') : 'Accès restreint à vos données pour le personnel autorisé.'}</li>
          <li>{ready ? t('politique_confidentialite.securite.liste.2') : 'Mises à jour régulières de nos systèmes pour prévenir les failles de sécurité.'}</li>
        </ul>
      </section>

      <section>
        <h2>{ready ? t('politique_confidentialite.droits.title') : '9. Vos droits'}</h2>
        <p>{ready ? t('politique_confidentialite.droits.description') : 'Conformément au RGPD, vous disposez des droits suivants sur vos données personnelles :'}</p>
        <ul>
          <li>{ready ? t('politique_confidentialite.droits.liste.0') : 'Droit d’accès : vous pouvez demander une copie de vos données.'}</li>
          <li>{ready ? t('politique_confidentialite.droits.liste.1') : 'Droit de rectification : vous pouvez corriger des données inexactes.'}</li>
          <li>{ready ? t('politique_confidentialite.droits.liste.2') : 'Droit à l’effacement : vous pouvez demander la suppression de vos données.'}</li>
          <li>{ready ? t('politique_confidentialite.droits.liste.3') : 'Droit à la limitation : vous pouvez limiter certains traitements de vos données.'}</li>
          <li>{ready ? t('politique_confidentialite.droits.liste.4') : 'Droit à la portabilité : vous pouvez recevoir vos données dans un format structuré.'}</li>
          <li>{ready ? t('politique_confidentialite.droits.liste.5') : 'Droit d’opposition : vous pouvez vous opposer à certains traitements (ex. marketing direct).'}</li>
        </ul>
        <p>{ready ? t('politique_confidentialite.droits.exercice') : 'Pour exercer ces droits, contactez-nous à contact@yasli.fr. Vous avez également le droit de déposer une plainte auprès de la CNIL (www.cnil.fr) si vous estimez que vos droits ne sont pas respectés.'}</p>
      </section>

      <section>
        <h2>{ready ? t('politique_confidentialite.modifications.title') : '10. Modifications de la politique'}</h2>
        <p>{ready ? t('politique_confidentialite.modifications.description') : 'Nous pouvons mettre à jour cette politique de confidentialité pour refléter les évolutions de nos pratiques ou les changements réglementaires. La version la plus récente sera toujours disponible sur cette page, avec une date de mise à jour. Nous vous encourageons à la consulter régulièrement.'}</p>
        <p>{ready ? t('politique_confidentialite.modifications.date') : 'Dernière mise à jour : 15 avril 2025'}</p>
      </section>

      <section>
        <h2>{ready ? t('politique_confidentialite.contact.title') : '11. Contact'}</h2>
        <p>{ready ? t('politique_confidentialite.contact.description') : 'Pour toute question concernant cette politique de confidentialité ou la gestion de vos données personnelles, vous pouvez nous contacter :'}</p>
        <ul>
          <li>{ready ? t('politique_confidentialite.contact.liste.0') : 'Email : contact@yasli.fr'}</li>
          <li>{ready ? t('politique_confidentialite.contact.liste.1') : 'Téléphone : +33 6 59 63 53 03'}</li>
          <li>{ready ? t('politique_confidentialite.contact.liste.2') : 'Adresse : 4 Place Esquiros, 13010 Marseille, France'}</li>
        </ul>
      </section>
    </div>
  );
};

export default PolitiqueConfidentialite;