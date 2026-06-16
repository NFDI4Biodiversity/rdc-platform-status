import STATUS from './status.mjs';

export default [
   {
      name: 'de.NBI Cloud',
      url: 'https://status.cloud.denbi.de/status/default',
      checkUrl: 'https://status.cloud.denbi.de/api/status-page/default/incident-history',
      check: async (res) => {
         const data = await res.json();

         if (data.ok === true) {
            return STATUS.UP;
         }

         if (data.ok === false) {
            return STATUS.INCIDENT;
         }
      },
   },
   {
      name: 'GWDG Cloud',
      url: 'https://status.gwdg.de/',
      checkUrl: 'https://statuspal.eu/api/v2/status_pages/gwdg/services/4252/status',
      check: async (res) => {
         const data = await res.json();

         if (data?.service.current_incident_type === null) {
            return STATUS.UP;
         }

         if (['major', 'minor', 'scheduled'].includes(data?.service.current_incident_type)) {
            return STATUS.INCIDENT;
         }
      },
   },
   {
      name: '4BioLogin',
      url: 'https://status.gwdg.de/',
      checkUrl: 'https://statuspal.eu/api/v2/status_pages/gwdg/services/3451/status',
      check: async (res) => {
         const data = await res.json();

         if (data?.service.current_incident_type === null) {
            return STATUS.UP;
         }

         if (['major', 'minor', 'scheduled'].includes(data?.service.current_incident_type)) {
            return STATUS.INCIDENT;
         }
      },
   },
   {
      name: 'NFDI Login',
      url: 'https://doc.nfdi-aai.de/',
      checkUrl: 'https://infraproxy.nfdi-aai.dfn.de/ds/WAYF.php',
   },
   {
      name: 'Scorpion',
      url: 'https://scorpion.bi.denbi.de/nfdi/',
      checkUrl: 'https://scorpion.bi.denbi.de/nfdi/',
   },
   {
      name: 'Website',
      url: 'https://nfdi4biodiversity.org',
      checkUrl: 'https://nfdi4biodiversity.org',
   },
   {
      name: 'Knowledge Base',
      url: 'https://kb.gfbio.org',
      checkUrl: 'https://kb.gfbio.org/status',
   },
   {
      name: 'Helpdesk',
      url: 'https://helpdesk.gfbio.org',
      checkUrl: 'https://helpdesk.gfbio.org/status',
   },
];
