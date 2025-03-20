/***************************** BEGIN LICENSE BLOCK ***************************

 The contents of this file are subject to the Mozilla Public License, v. 2.0.
 If a copy of the MPL was not distributed with this file, You can obtain one
 at http://mozilla.org/MPL/2.0/.

 Software distributed under the License is distributed on an "AS IS" basis,
 WITHOUT WARRANTY OF ANY KIND, either express or implied. See the License
 for the specific language governing rights and limitations under the License.

 Copyright (C) 2015-2020 Mathieu Dhainaut. All Rights Reserved.

 Author: Mathieu Dhainaut <mathieu.dhainaut@gmail.com>

 ******************************* END LICENSE BLOCK ***************************/

/**
 *
 * From describe tasking:
 * swe:item name="relMove">
 <swe:Text definition="http://sensorml.com/ont/swe/property/CameraRelativeMovementName">
 <swe:label>Camera Relative Movements</swe:label>
 <swe:constraint>
 <swe:AllowedTokens>
 <swe:value>Down</swe:value>
 <swe:value>Up</swe:value>
 <swe:value>Left</swe:value>
 <swe:value>Right</swe:value>
 <swe:value>TopLeft</swe:value>
 <swe:value>TopRight</swe:value>
 <swe:value>BottomLeft</swe:value>
 <swe:value>BottomRight</swe:value>
 </swe:AllowedTokens>
 </swe:constraint>
 </swe:Text>
 </swe:item>

 <swe:item name="preset">
 <swe:Text definition="http://sensorml.com/ont/swe/property/CameraPresetPositionName">
 <swe:label>Preset Camera Position</swe:label>
 <swe:constraint>
 <swe:AllowedTokens>
 <swe:value>Reset</swe:value>
 <swe:value>TopMost</swe:value>
 <swe:value>BottomMost</swe:value>
 <swe:value>LeftMost</swe:value>
 <swe:value>RightMost</swe:value>
 </swe:AllowedTokens>
 </swe:constraint>
 </swe:Text>
 </swe:item>
 */

 import DataSink from '../../../source/core/datapush/DataSink.js';
import FoscamPtzTasking from '../../../source/core/datapush/FoscamPtzTasking.js';

 /**
  * @extends DataSink
  */
 class OnvifTasking extends DataSink {
 
     /**
      * Gets the command data.
      * @param {Object}  values -
      * @param {String}  values.preset -
      * @param {String}  values.czoom -
      * @param {String}  values.cpan -
      * @param {String}  values.ctilt -
      * @return {string}
      */
     getCommandData(values) {
         let cmdData = "";

        if (values.cpan !== null && values.ctilt !== null && values.czoom !== null) {
            cmdData += "ptzCont," + values.cpan + "," + values.ctilt + "," + values.czoom;
        } 
         return cmdData;
     }

     buildRequest(cmdData) {
        let xmlSpsRequest = "<sps:Submit ";

        // adds service
        xmlSpsRequest += "service=\"" + this.properties.service + "\" ";

        // adds version
        xmlSpsRequest += "version=\"" + this.properties.version + "\" ";

        // adds ns
        xmlSpsRequest += "xmlns:sps=\"http://www.opengis.net/sps/2.0\" xmlns:swe=\"http://www.opengis.net/swe/2.0\"> ";

        // adds procedure
        xmlSpsRequest += "<sps:procedure>" + this.properties.procedure + "</sps:procedure>";

        // adds taskingParameters
        xmlSpsRequest += "<sps:taskingParameters><sps:ParameterData>";

        // adds encoding
        xmlSpsRequest += "<sps:encoding><swe:TextEncoding blockSeparator=\" \"  collapseWhiteSpaces=\"true\" decimalSeparator=\".\" tokenSeparator=\",\"/></sps:encoding>";

        // adds values
        xmlSpsRequest += "<sps:values>" + cmdData + "</sps:values>";

        // adds endings
        xmlSpsRequest += "</sps:ParameterData></sps:taskingParameters></sps:Submit>";

        return xmlSpsRequest;
    }

 }
 
 export default  OnvifTasking;
 