import React from 'react'
import { Card, CardHeader, CardBody, Row, Col } from 'reactstrap'

import { EchartTest, BarZoom, MultiLine } from '../visualization/EchartTest'

class  MyEchart extends React.Component {
	render() {
		var sampling = [ ];
  
		for (let i = 0; i < 200; i++) {
			sampling.push([i, Math.random() * i * 4]);
		}

		return (
			<>
				<CardHeader>
					<h5 className="title">Lab for E-Charts</h5>
					<p className="category">
						Testing
					</p>
				</CardHeader>
				<CardBody className="all-icons">
          <Row>
            <Col>
              <Card style={{width: 'auto', height: 'auto'}}>
                <CardBody>
									<EchartTest width={600} height={500}/>
								</CardBody>
								</Card>
            </Col>

            <Col>
              <Card style={{width: 'auto', height: 'auto'}}>
                <CardBody>
									<BarZoom width={800}
										height={500}
										seriesArray={ [ {name: 'Universities', data: sampling} ] }
										xLabel="Hungry Students"
										yLabel="Hot Pockets Eaten"
										title="Hot Pockets Eaten By Hungry Students"
										showZoom={true}
							 />
								</CardBody>
								</Card>
            </Col>

						<Col>
              <Card style={{width: 'auto', height: 'auto'}}>
                <CardBody>
									<MultiLine width={800} height={500}/>
								</CardBody>
								</Card>
            </Col>
					</Row>
				</CardBody>
			</>
		)
	}
}

export default MyEchart