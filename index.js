const Dymo = require('dymojs'),
	   dymo = new Dymo();

const readline = require('readline');
const rl = readline.createInterface({
  input: process.stdin,
  output: process.stdout,
  prompt: '> '
});

var lbl = ""
var copies = "2"

rl.prompt();

rl.on('line', (line) => {
  switch (line.trim()) {
	case 'c+':
	copies++;
	console.log(`Copies: ${copies} `);
	break;

	case 'c-':
	copies--;
	console.log(`Copies: ${copies} `);
	break;


	default: 
	  lbl = line.split("|").join("\n").trim();
	  var labelXml = 
			`<?xml version="1.0" encoding="utf-8"?>
			<DieCutLabel Version="8.0" Units="twips" MediaType="Durable">
				<PaperOrientation>Landscape</PaperOrientation>
				<Id>LW_DURABLE_25X89mm</Id>
				<IsOutlined>false</IsOutlined>
				<PaperName>1933081 Drbl 1 x 3-1/2 in</PaperName>
				<DrawCommands>
					<RoundRectangle X="0" Y="0" Width="1440" Height="5040" Rx="90.708661417" Ry="90.708661417" />
				</DrawCommands>
				<ObjectInfo>
					<TextObject>
						<Name>TEXT</Name>
						<ForeColor Alpha="255" Red="0" Green="0" Blue="0" />
						<BackColor Alpha="0" Red="255" Green="255" Blue="255" />
						<LinkedObjectName />
						<Rotation>Rotation0</Rotation>
						<IsMirrored>False</IsMirrored>
						<IsVariable>False</IsVariable>
						<GroupID>-1</GroupID>
						<IsOutlined>False</IsOutlined>
						<HorizontalAlignment>Center</HorizontalAlignment>
						<VerticalAlignment>Middle</VerticalAlignment>
						<TextFitMode>AlwaysFit</TextFitMode>
						<UseFullFontHeight>True</UseFullFontHeight>
						<Verticalized>False</Verticalized>
						<StyledText>
							<Element>
								<String xml:space="preserve">${lbl.trim()}</String>
								<Attributes>
									<Font Family="Arial" Size="12" Bold="False" Italic="False" Underline="False" Strikeout="False" />
									<ForeColor Alpha="255" Red="0" Green="0" Blue="0" HueScale="100" />
								</Attributes>
							</Element>
						</StyledText>
					</TextObject>
					<Bounds X="330" Y="60" Width="4620" Height="1290" />
				</ObjectInfo>
			</DieCutLabel>`;
	
	  console.log(`Printing:\n '${line.split("|").join("\n").trim()}'`);
	  for (var i=0; i < copies; i++) dymo.print('DYMO LabelWriter 4XL', labelXml);
      
      break;
  }
  rl.prompt();
}).on('close', () => {
  console.log('Closing');
  process.exit(0);
});
