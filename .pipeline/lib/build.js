'use strict';
const {OpenShiftClientX} = require('pipeline-cli')
const path = require('path');

module.exports = (settings)=>{
  const phases = settings.phases
  const options = settings.options
  const oc=new OpenShiftClientX(Object.assign({'namespace':phases.build.namespace}, options));
  const phase='build'
  let objects = []
  const templatesLocalBaseUrl =oc.toFileUrl(path.resolve(__dirname, '../../openshift'))

  console.log(oc.git)
  // The building of your cool app goes here ▼▼▼
  objects = objects.concat(oc.processDeploymentTemplate(
    `${templatesLocalBaseUrl}/image-stream-build.yaml`,
    {
      'param':{
        'SAMPLE_APP_SERVICE_NAME': phases[phase].name,
        'NAMESPACE': phases[phase].namespace,
        //'SUFFIX': phases[phase].suffix,
        'VERSION': phases[phase].tag,
        'GIT_URL': oc.git.http_url,
        'GIT_REF': oc.git.ref
      }
    }))

  oc.applyRecommendedLabels(objects, phases[phase].name, phase, phases[phase].changeId, phases[phase].instance)
  oc.applyAndBuild(objects)
}
