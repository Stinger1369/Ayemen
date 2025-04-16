import React from 'react';
import { useTranslation } from 'react-i18next';
import './PolitiqueConfidentialite.css';

const PolitiqueConfidentialite = () => {
  const { t, ready } = useTranslation();

  return (
    <div className="politique-confidentialite">
      <h1>{ready ? t('politique_confidentialite.title') : 'Protection des données personnelles et de la vie privée (Loi RGPD)'}</h1>
      <p className="intro">
        {ready ? t('politique_confidentialite.intro') : 'Yasli attache la plus grande importance à la protection de votre vie privée et s’engage à vous assurer le meilleur niveau de protection de vos données à caractère personnel en conformité avec les réglementations européennes et françaises qui lui sont applicables en matière de protection des données personnelles.'}
      </p>
      <p className="intro">
        {ready ? t('politique_confidentialite.transparency') : 'Dans un souci de transparence, cette rubrique a pour objet de vous expliquer les traitements de données à caractère personnel mis en œuvre dans le cadre de l’utilisation des services proposés par Yasli ainsi que la manière dont vous pouvez exercer vos droits sur vos données personnelles.'}
      </p>

      <section>
        <h2>{ready ? t('politique_confidentialite.responsable.title') : 'Qui est le responsable du traitement de vos données ?'}</h2>
        <p>
          {ready ? t('politique_confidentialite.responsable.description') : 'Dans le cadre des services proposés par Yasli, le responsable du traitement de vos données personnelles est : Yasli, société à responsabilité limitée (SARL) au capital de 10.000 euros, immatriculée au registre du commerce et des sociétés de Marseille sous le numéro B 123 456 789.'}
        </p>
      </section>

      <section>
        <h2>{ready ? t('politique_confidentialite.donnees_collectees.title') : 'Quelles données collectons-nous ?'}</h2>
        <p>{ready ? t('politique_confidentialite.donnees_collectees.description') : 'Yasli traite vos données :'}</p>
        <ul>
          <li>{ready ? t('politique_confidentialite.donnees_collectees.liste.0') : 'D’inscription : données figurant sur les formulaires de réservation ou de contact telles que vos nom, prénom, coordonnées, téléphone, email.'}</li>
          <li>{ready ? t('politique_confidentialite.donnees_collectees.liste.1') : 'Liées à l’utilisation des services de Yasli : données permettant de vous identifier et de vous authentifier (logs de connexion, adresse IP), celles relatives aux réservations, aux lieux et moments de prestation, à votre parcours de navigation sur le site, aux dates et horaires de consultation du site.'}</li>
        </ul>
      </section>

      <section>
        <h2>{ready ? t('politique_confidentialite.finalites.title') : 'Pourquoi collectons-nous vos données ?'}</h2>
        <p>{ready ? t('politique_confidentialite.finalites.description') : 'Yasli utilise vos données personnelles principalement pour les finalités suivantes :'}</p>
        <p><strong>{ready ? t('politique_confidentialite.finalites.gestion.title') : 'La gestion de vos réservations et la relation client, notamment :'}</strong></p>
        <ul>
          <li>{ready ? t('politique_confidentialite.finalites.gestion.liste.0') : 'Gestion des réservations.'}</li>
          <li>{ready ? t('politique_confidentialite.finalites.gestion.liste.1') : 'La lutte contre la fraude.'}</li>
          <li>{ready ? t('politique_confidentialite.finalites.gestion.liste.2') : 'Mise en œuvre des prestations de nettoyage, facturation et comptabilité.'}</li>
          <li>{ready ? t('politique_confidentialite.finalites.gestion.liste.3') : 'Recueil de vos commentaires et avis.'}</li>
          <li>{ready ? t('politique_confidentialite.finalites.gestion.liste.4') : 'Gestion des réclamations et du service après-vente.'}</li>
          <li>{ready ? t('politique_confidentialite.finalites.gestion.liste.5') : 'Gestion de vos demandes liées à l’exercice de vos droits, notamment d’accès, de rectification, et d’opposition issus du règlement européen sur la protection des données personnelles.'}</li>
          <li>{ready ? t('politique_confidentialite.finalites.gestion.liste.6') : 'Réalisation d’analyses/statistiques pour répondre à des enquêtes ou demandes menées par des organismes d’intérêts publics, ou des administrations, ou autorités administratives ou judiciaires.'}</li>
          <li>{ready ? t('politique_confidentialite.finalites.gestion.liste.7') : 'Tracer et administrer les preuves que Yasli doit rapporter en application de ses obligations légales ou réglementaires ou pour des besoins liés à la gestion du contentieux.'}</li>
        </ul>
        <p><strong>{ready ? t('politique_confidentialite.finalites.prospection.title') : 'La réalisation d’opérations de prospection commerciale :'}</strong></p>
        <ul>
          <li>{ready ? t('politique_confidentialite.finalites.prospection.liste.0') : 'Pour vous envoyer des messages personnalisés ou non par voie électronique, selon votre profil.'}</li>
          <li>{ready ? t('politique_confidentialite.finalites.prospection.liste.1') : 'Mise en place de jeux ou concours.'}</li>
          <li>{ready ? t('politique_confidentialite.finalites.prospection.liste.2') : 'Pour analyser votre utilisation des services, afin que nous puissions mieux vous connaître, apprécier l’intérêt que représente les services proposés ainsi que les messages que nous vous adressons et vous proposer des offres, contenus et des services adaptés à votre profil.'}</li>
        </ul>
        <p><strong>{ready ? t('politique_confidentialite.finalites.techniques.title') : 'La réalisation d’opérations techniques liées aux traitements de vos données personnelles :'}</strong></p>
        <ul>
          <li>{ready ? t('politique_confidentialite.finalites.techniques.liste.0') : 'Les opérations techniques liées au redressement d’adresses.'}</li>
          <li>{ready ? t('politique_confidentialite.finalites.techniques.liste.1') : 'L’attribution d’un identifiant numérique lié à vos données, afin que nous puissions interagir avec vous via notre site internet.'}</li>
          <li>{ready ? t('politique_confidentialite.finalites.techniques.liste.2') : 'Pour analyser votre utilisation des services, afin que nous puissions mieux vous connaître, apprécier l’intérêt que représente les services proposés ainsi que les messages que nous vous adressons et vous proposer des offres, contenus et des services adaptés à votre profil.'}</li>
          <li>{ready ? t('politique_confidentialite.finalites.techniques.liste.3') : 'Les opérations techniques, organisationnelles ou de cybersécurité liées à la détection d’anomalie et à la sécurisation de vos données ainsi que de nos systèmes d’information à partir desquels vos données sont traitées.'}</li>
        </ul>
        <p>{ready ? t('politique_confidentialite.finalites.bases') : 'L’ensemble de ces traitements sont basés sur :'}</p>
        <ul>
          <li>{ready ? t('politique_confidentialite.finalites.bases.liste.0') : 'L’exécution d’un contrat.'}</li>
          <li>{ready ? t('politique_confidentialite.finalites.bases.liste.1') : 'L’exécution d’une obligation légale.'}</li>
          <li>{ready ? t('politique_confidentialite.finalites.bases.liste.2') : 'L’intérêt légitime de Yasli.'}</li>
          <li>{ready ? t('politique_confidentialite.finalites.bases.liste.3') : 'Votre consentement.'}</li>
        </ul>
      </section>

      <section>
        <h2>{ready ? t('politique_confidentialite.destinataires.title') : 'Qui a accès à vos données ?'}</h2>
        <p>{ready ? t('politique_confidentialite.destinataires.description') : 'Vos données pourront être transmises :'}</p>
        <ul>
          <li>{ready ? t('politique_confidentialite.destinataires.liste.0') : 'Aux personnes habilitées des équipes Yasli (ex : services en charge du marketing, des études et analyses, du service clients, du contentieux, des affaires comptables et fiscales ou de l’informatique et de la sécurité des systèmes d’information).'}</li>
          <li>{ready ? t('politique_confidentialite.destinataires.liste.1') : 'Aux prestataires et sous-traitants de Yasli intervenant par exemple pour les opérations suivantes : lutte contre la fraude, la préparation, l’exécution et le suivi de vos réservations.'}</li>
          <li>{ready ? t('politique_confidentialite.destinataires.liste.2') : 'Aux autorités administratives ou judiciaires le cas échéant dans le cadre du respect de nos obligations légales ou pour nous permettre d’assurer la défense de nos droits et intérêts.'}</li>
        </ul>
        <p className="note">{ready ? t('politique_confidentialite.destinataires.note') : 'À noter : Vos données ne seront ni louées, ni revendues à des tiers à des fins d’utilisation marketing.'}</p>
      </section>

      <section>
        <h2>{ready ? t('politique_confidentialite.conservation.title') : 'Combien de temps conservons-nous vos données ?'}</h2>
        <p>{ready ? t('politique_confidentialite.conservation.description') : 'Nous avons déterminé des règles précises concernant la durée de conservation de vos données : En tout état de cause, ces données ne seront conservées que pour la durée nécessaire à l’accomplissement des finalités ci-dessus précisées, augmentée du délai de prescription légale.'}</p>
        <p>{ready ? t('politique_confidentialite.conservation.inscription') : 'Les données recueillies lors de votre réservation ou de votre contact seront conservées pendant toute la durée de votre interaction avec nous. Ces données pourront être conservées pendant un délai de 3 ans suivant le dernier contact de votre part.'}</p>
        <p>{ready ? t('politique_confidentialite.conservation.specific') : 'Les données vous concernant sont susceptibles d’être conservées plus longtemps. Pour certains types de traitement, la conservation des données fait l’objet de durées de conservation spécifiques, notamment :'}</p>
        <ul>
          <li>{ready ? t('politique_confidentialite.conservation.liste.0') : '6 ans pour les documents fiscaux.'}</li>
          <li>{ready ? t('politique_confidentialite.conservation.liste.1') : '10 ans pour les pièces comptables.'}</li>
          <li>{ready ? t('politique_confidentialite.conservation.liste.2') : 'Toute la durée nécessaire pour les contentieux et jusqu’à épuisement des voies de recours.'}</li>
          <li>{ready ? t('politique_confidentialite.conservation.liste.3') : '3 ans pour les données relatives aux noms, prénoms et adresses des clients suspectés de fraude et à l’origine d’impayés. Ces données seront enregistrées dans un traitement spécifique destiné à détecter de nouvelles transactions présentant un risque de fraude.'}</li>
          <li>{ready ? t('politique_confidentialite.conservation.liste.4') : '3 ans pour les données relatives aux pièces d’identité en cas d’exercice de leurs droits par les personnes concernées.'}</li>
        </ul>
      </section>

      <section>
        <h2>{ready ? t('politique_confidentialite.securite.title') : 'Comment vos données sont-elles sécurisées ?'}</h2>
        <p><strong>{ready ? t('politique_confidentialite.securite.generale.title') : 'Règles générales :'}</strong></p>
        <p>{ready ? t('politique_confidentialite.securite.generale.description') : 'Yasli met en place les mesures techniques, physiques et organisationnelles appropriées pour préserver la sécurité et la confidentialité de vos données.'}</p>
        <p>{ready ? t('politique_confidentialite.securite.prestataires') : 'Yasli choisit des sous-traitants ou des prestataires qui présentent des garanties en termes de qualité, de sécurité, de fiabilité et de ressources pour assurer la mise en œuvre de mesures techniques et organisationnelles en matière de sécurité des traitements.'}</p>
      </section>

      <section>
        <h2>{ready ? t('politique_confidentialite.transfert.title') : 'Vos données sont-elles traitées en dehors de l’Union Européenne ?'}</h2>
        <p>{ready ? t('politique_confidentialite.transfert.description') : 'Vos données peuvent être transmises à des sociétés prestataires de Yasli situées dans des pays hors Union Européenne pour les activités liées à la gestion de la fraude.'}</p>
        <p>{ready ? t('politique_confidentialite.transfert.garanties') : 'Yasli met tout en œuvre pour obtenir les garanties nécessaires à la sécurisation de tels transferts.'}</p>
      </section>

      <section>
        <h2>{ready ? t('politique_confidentialite.droits.title') : 'Quels sont vos droits ?'}</h2>
        <p>{ready ? t('politique_confidentialite.droits.description') : 'Vous bénéficiez des droits suivants :'}</p>
        <ul>
          <li>{ready ? t('politique_confidentialite.droits.liste.0') : 'Un droit à l’information.'}</li>
          <li>{ready ? t('politique_confidentialite.droits.liste.1') : 'Un droit d’accès.'}</li>
          <li>{ready ? t('politique_confidentialite.droits.liste.2') : 'Un droit de rectification.'}</li>
          <li>{ready ? t('politique_confidentialite.droits.liste.3') : 'Un droit d’opposition et d’effacement au traitement de ses données.'}</li>
          <li>{ready ? t('politique_confidentialite.droits.liste.4') : 'Un droit d’opposition au profilage.'}</li>
          <li>{ready ? t('politique_confidentialite.droits.liste.5') : 'Un droit à la limitation du traitement.'}</li>
          <li>{ready ? t('politique_confidentialite.droits.liste.6') : 'Un droit à la portabilité de ses données.'}</li>
          <li>{ready ? t('politique_confidentialite.droits.liste.7') : 'Un droit de définir des directives relatives au sort de vos données après votre décès.'}</li>
        </ul>
        <p>{ready ? t('politique_confidentialite.droits.exercice') : 'Pour exercer vos droits, écrivez-nous à : Yasli / Service client, 4 Place Esquiros, 13010 Marseille, France.'}</p>
        <p>{ready ? t('politique_confidentialite.droits.formalites') : 'Votre demande doit être signée et accompagnée de la photocopie d’un titre d’identité portant votre signature et préciser l’adresse à laquelle doit vous parvenir la réponse. Nous vous adresserons une réponse dans les meilleurs délais.'}</p>
      </section>

      <section>
        <h2>{ready ? t('politique_confidentialite.cookies.title') : 'Yasli utilise-t-il des cookies, tags et traceurs ?'}</h2>
        <p>{ready ? t('politique_confidentialite.cookies.description') : 'Les cookies émis par Yasli sur le site vous permettent, en tant qu’utilisateur, de bénéficier de façon optimale et personnalisée des services proposés par Yasli. Ainsi, les cookies nous permettent :'}</p>
        <ul>
          <li>{ready ? t('politique_confidentialite.cookies.liste.0') : 'De mémoriser vos préférences d’affichage (langue utilisée, paramètres d’affichage, système d’exploitation utilisé, etc.) et d’adapter la présentation du site lors de vos visites, selon les matériels et logiciels de visualisation ou de lecture que comporte votre terminal et qui sont utilisés pour la navigation sur le site.'}</li>
          <li>{ready ? t('politique_confidentialite.cookies.liste.1') : 'De mémoriser les informations relatives, par exemple, à un formulaire que vous avez rempli ou à un service (réservation, contact) ou une information que vous avez choisie.'}</li>
          <li>{ready ? t('politique_confidentialite.cookies.liste.2') : 'De vous permettre d’accéder à des espaces réservés et personnels du site, tels que votre compte personnel, grâce à des identifiants ou des données personnelles vous concernant antérieurement communiquées, vous permettant le cas échéant d’accéder à des contenus personnalisés.'}</li>
          <li>{ready ? t('politique_confidentialite.cookies.liste.3') : 'De mettre en œuvre des mesures de sécurité.'}</li>
          <li>{ready ? t('politique_confidentialite.cookies.liste.4') : 'De mesurer et d’analyser la fréquentation et d’utilisation du site, de ses rubriques et services proposés, permettant à Yasli de réaliser des études et d’améliorer l’intérêt et l’ergonomie du site et de ses services.'}</li>
        </ul>
        <p className="note">{ready ? t('politique_confidentialite.cookies.note') : 'À noter : Pour respecter un maximum votre vie privée, Yasli a choisi de ne pas afficher de publicité. (Ainsi, pas de retargeting ni de remarketing)'}</p>
      </section>

      <section>
        <h2>{ready ? t('politique_confidentialite.contact.title') : 'Qui contacter en cas de difficultés ?'}</h2>
        <p>{ready ? t('politique_confidentialite.contact.description') : 'Pour toutes questions, vous pouvez nous contacter via cette adresse email : contact@yasli.fr'}</p>
        <p>{ready ? t('politique_confidentialite.contact.dpo') : 'Délégué à la Protection des Données Personnelles : Yasli / Service client, 4 Place Esquiros, 13010 Marseille, France.'}</p>
      </section>
    </div>
  );
};

export default PolitiqueConfidentialite;