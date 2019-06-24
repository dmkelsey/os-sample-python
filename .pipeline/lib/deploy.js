'use strict';
const {OpenShiftClientX} = require('pipeline-cli')
const path = require('path');

module.exports = (settings)=>{
  const phases = settings.phases
  const options= settings.options
  const phase=options.env
  const changeId = phases[phase].changeId
  const oc=new OpenShiftClientX(Object.assign({'namespace':phases[phase].namespace}, options));
  const templatesLocalBaseUrl =oc.toFileUrl(path.resolve(__dirname, '../../openshift'))
  var objects = []

  // The deployment of your cool app goes here ▼▼▼
  objects = objects.concat(oc.processDeploymentTemplate(
    `${templatesLocalBaseUrl}/image-stream-deploy.yaml`,
    {
      'param':{
        'SAMPLE_APP_SERVICE_NAME': phases[phase].name,
        'NAMESPACE': phases[phase].namespace,
        //'SUFFIX': phases[phase].suffix,
        //'VERSION': phases[phase].tag,
        //'HOST': phases[phase].host || ''
      }
    }))

  oc.applyRecommendedLabels(objects, phases[phase].name, phase, `${changeId}`, phases[phase].instance)
  oc.importImageStreams(objects, phases[phase].tag, phases.build.namespace, phases.build.tag)
  oc.applyAndDeploy(objects, phases[phase].instance)
}
